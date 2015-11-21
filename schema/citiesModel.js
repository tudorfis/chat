var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var citiesSchema   = new Schema({
    "city": String,
    "city_id": String,
    "county_id": String
},{collection : 'cities'},{database: 'chat'});

module.exports = mongoose.model('citiesModel', citiesSchema);