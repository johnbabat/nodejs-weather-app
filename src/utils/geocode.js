request = require('request');

const geocode = (address, callback) => {
    const mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoiam9obmJhYmF0IiwiYSI6ImNrNXR4b3FzeDByaWgzam53a3N1bTljMmQifQ.YGWKEgHhICjTRGJ1bF6nMw&limit=1';

    request({url:mapurl, json:true}, (error, response) => {
        if (error) {
            callback({error}, undefined);
        } else if (response.body.features['length'] == 0) {
            callback({error: 'Error: Invalid Address. Please try another address'}, undefined);
        } else {
            callback(undefined,
                {   latitude: response.body.features[0].center[1],
                    longtitude: response.body.features[0].center[0],
                    location: 'Location: <br>' + response.body.features[0].place_name   });
        }
    })
}

module.exports = geocode;