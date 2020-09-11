const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2RveWxlNDI5IiwiYSI6ImNrZXY3dGlpYTQyNmEydm5wZjhybzZsNGcifQ.V2wvlfbg2xn8VooPpnZQWQ&limit=1`

    request({ url, json: true}, (error, { body }) => {
        const { features } = body
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            console.log(features)
            const { place_name, center } = features[0]
            callback(undefined, {
                location: place_name,
                long: center[0],
                lat: center[1]
            })
        }
    })
}

module.exports = geocode