const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmF2b203IiwiYSI6ImNrNGpzMWRqNDF5b2YzbHFlNTRtOWNpa20ifQ.M1uzwlKEPPFgGGr4syemBQ&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to conect to internet!..', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location, Try another search.', undefined);
        } else {
            callback(undefined, {
                Location : body.features[0].place_name,
                Latitude: body.features[0].center[1],
                Longitude: body.features[0].center[0]
            })
        }
    })
}


module.exports = geocode;
