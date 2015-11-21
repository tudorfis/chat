
var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

content = "[\n";
var county_id = 1;
var makeRequest = function(county_id) {
    request('http://www.anunturi.ro/ajax/cont/regiuni?county_id=' + county_id, function (err, resp, body) {
        console.log(county_id);
        var $ = cheerio.load(body);
        $('option').each(function (i, element) {
            var city_id = $(element).attr('value'),
                city = $(element).html();
            content += "{city:'" + city + "',city_id:'" + city_id + "',county_id:'" + county_id + "'},\n";
        });
        content = content.substring(0, content.length - 1);
        county_id++;
        if (county_id < 43) {
            makeRequest(county_id);
        }
    });
};

makeRequest(county_id);

setTimeout(function(){
    content = content.substring(0, content.length - 1);
    content += "]";
    fs.writeFile('./cities.json', content);
}, 3000);


