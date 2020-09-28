const geocode = require('./geocode');
const request = require('request')

const forecast = (address, callback) => {
  geocode(address, (error, response) => {
    if (error) {
      console.log(error)
    }
    else {
      const {latLong, placeName} = response;
      const WEATHER_API_KEY = 'd2200e8072f6d6d4788729357760db95';
      const weatherUrl = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latLong[0],latLong[1]}&units=f`;

      request({url: weatherUrl, json: true}, (error, {body}) => {
        if (error) {
          callback("Couldn't connect to weather service")
        }
        else if (body.current === undefined) {
          callback("Bad location")
        }
        else {
          const current = body.current;

          callback(null, {
            address: address,
            location: placeName,
            weather: current.weather_descriptions[0],
            temperature: current.temperature,
            feelslike: current.feelslike
          })
        }
      })
    }
  })
}

module.exports = forecast;