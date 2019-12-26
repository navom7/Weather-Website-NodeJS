const request = require('request');

const forecast = (lat, long, callback ) => {
    const curl = 'https://api.darksky.net/forecast/cb22ba38368a1f87a06c0240b833f91a/'+lat+','+long;
    request({url: curl, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the internet ', undefined);
        } else if(body.error) {
            callback('Unable to find the location ', undefined);
        } else {
            callback(
                undefined, body.daily.data[1].summary+' and ' + body.currently.temperature + ' degree fahrenheit ' + body.currently.precipProbability + ' chance of precipitation.'
            )
        }
    })
}

module.exports = forecast;