const request = require('request');

const forecast = (lat, long, callback ) => {
    const curl = 'https://api.darksky.net/forecast/cb22ba38368a1f87a06c0240b833f91a/'+lat+','+long;
    request({url: curl, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the internet ', undefined);
        } else if(body.error) {
            callback('Unable to find the location ', undefined);
        } else {
            console.log(body.daily.data[0]);
            callback(
                undefined,
                body.daily.data[1].summary+' Current temperature is ' + body.currently.temperature + ' degree fahrenheit and there is a ' + body.currently.precipProbability + '/1 chance of precipitation.' +
                '. The highest temperature today is ' + body.daily.data[0].temperatureHigh  + ' degree Fahrenheit and the lowest temperature today is '  +  body.daily.data[0].temperatureHigh + ' degree Fahrenheit.' 

            )
        }
    })
}

module.exports = forecast;