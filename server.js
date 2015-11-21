var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid'),
    _ = require('underscore'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    messagesModel = require('./schema/messagesModel'),
    imagesModel = require('./schema/imagesModel'),
    citiesModel = require('./schema/citiesModel'),
    countiesModel = require('./schema/countiesModel'),
    users = {};

mongoose.connect('mongodb://localhost:27017/chat');

app.use(express.static('app'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/save-image', function(req, res){
    var data = req.body.data,
        image = new imagesModel();
    image.data = new Buffer(data, "binary");
    image.save();
    res.send({
        "_id": image._id
    });
});

app.get('/images/:_id', function(req, res){
    if (req.params._id){
        imagesModel.findOne({"_id": req.params._id}, function (err, imageData) {
            if (imageData) {
                res.contentType('image/jpeg');
                res.send(imageData.data);
            } else {
                res.send(null);
            }
        });
    } else {
        res.send(null);
    }
});

app.get('/api/collection/:collection', function(req, res){
    var collection = req.params.collection;
    try {
        model = eval(collection+'Model');
        model.find({}, function(err, data){
            if (err) throw console.log(err);
            res.send(data);
        })
    } catch (e) {
        res.send(null);
    }
});

io.sockets.on('connection', function(socket){

    socket.on('setChatMessage', function (data) {
        var message = _.extend(new messagesModel(), data);
        message.save();
        io.sockets.emit('getChatMessage', data);
    });

    socket.on('saveIdentity', function(data, callback){
        var callback_data = {
            is_error: 0,
            error_type: ''
        };
        if (data.username in Object.keys(users)) {
            callback_data = {
                is_error: 1,
                error_type: 'is_taken'
            };
        }
        if (callback.is_error) {
            callback(callback_data);
        } else {
            socket.identity = data;
            users[data.username] = data;
            callback(callback_data);
            io.sockets.emit('sendUsers', users);
        }
    });

    socket.on('getUsers', function(data){
        io.sockets.emit('sendUsers', users);
    });

    socket.on('getMessages', function(data){
        messagesModel.find({}, function (err, messages) {
            io.sockets.emit('sendMessages', messages);
        });
    });

    socket.on('disconnect', function(){
        if (!socket.identity) return;
        delete users[socket.identity.username];
        io.sockets.emit('sendUsers', users);
    });

});

server.listen(3000);
console.log('http://localhost:3000 chat app started !');
