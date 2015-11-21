var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var imagesSchema   = new Schema({
    "data": Buffer
},{collection : 'images'},{database: 'chat'});

module.exports = mongoose.model('imagesModel', imagesSchema);