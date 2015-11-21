var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var countiesSchema   = new Schema({
    "county_id": String,
    "county": String
},{collection : 'counties'},{database: 'chat'});

module.exports = mongoose.model('countiesModel', countiesSchema);