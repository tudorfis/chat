var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var messagesSchema   = new Schema({
    "message": String,
    "time": {
        "h": Number,
        "m": Number,
        "s": Number
    },
    "time_str": String,
    "username": String,
    "identity": {
        "county_id": String,
        "city_id": String,
        "telephone": String,
        "email": String
    },
    "pm_username": String,
    "current_state": String,
    "image_id": String
},{collection : 'messages'},{database: 'chat'});

module.exports = mongoose.model('messagesModel', messagesSchema);