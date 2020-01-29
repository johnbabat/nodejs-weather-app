request = require('request');

const forecast = (lat, long, callback) => {
    const weatherurl = 'https://api.darksky.net/forecast/7fa76098a792a7041040b90681070f53/' + lat + ',' + long + '?units=si';
    request({url:weatherurl, json:true}, (error, response) => {
        if (error) {
            callback({error}, undefined);
        } else if (response.body.error) {
            callback({error: 'Error: Invalid address. Please try another address'}, undefined);
        } else {
            callback(undefined, 'Weather summary:<br> ' + response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees Celcius. The high today is ' + response.body.daily.data[0].temperatureHigh + ' degrees celcius, and the low is ' + response.body.daily.data[0].temperatureLow + ' degrees Celcius. There is a '+ response.body.currently.precipProbability * 100 + '% chance of a rain.');
        }
    })
}

module.exports = forecast;