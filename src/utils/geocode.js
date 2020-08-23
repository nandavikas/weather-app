const request = require('request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFuZGF2aWthcyIsImEiOiJjanNmcDFra2owMTNvNDVrYXIydG5pdHQ5In0.9YJ_T7hf0tiDaEXceuObMg&limit=1`
    const options = {
        url,
        json: true
    }

    request(options, (error, { body }) => {
        if (error) {
            callback('Unable to connect to maps service!', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to fetch location. Try another search', undefined)
        }
        else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            // console.log(`Latitude: ${latitude}\nLongitude: ${longitude}`)
            const location = body.features[0].place_name
            callback(undefined,{latitude,longitude, location})
        }
    })

}

module.exports = geoCode