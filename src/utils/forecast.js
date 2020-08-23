const request = require('request')

const forecast = (latitude, longitude, callback) => {
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
            callback(undefined,`Weather Description: ${body.current.weather_descriptions[0]}\nIt is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)
        }
    })
}

module.exports = forecast