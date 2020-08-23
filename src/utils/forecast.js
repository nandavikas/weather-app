const request = require('request')

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude)
    const url = `http://api.weatherstack.com/current?access_key=bf59123a36c9a99883a40f7900067980&query=${latitude,longitude}&units=m`
    const options = {
        url,
        json: true
    }

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        }
        else if (body.error) {
            // console.log(response.body.error)
            callback('Unable to find location',undefined)
        }
        else {
            callback(undefined,{weather: `Weather Description: ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out but it feels like ${body.current.feelslike} degrees`, windSpeed: body.current.wind_speed, pressure: body.current.pressure})
        }
    })
}

module.exports = forecast