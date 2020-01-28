request = require('request');

const forecast = (lat, long, callback) => {
    const weatherurl = 'https://api.darksky.net/forecast/7fa76098a792a7041040b90681070f53/' + lat + ',' + long;
    request({url:weatherurl, json:true}, (error, response) => {
        if (error) {
            callback({error}, undefined);
        } else if (response.body.error) {
            callback({error: 'Error: Invalid address. Please try another address'}, undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a '+ response.body.currently.precipProbability * 100 + '% chance of a rain.');
        }
    })
}

module.exports = forecast;