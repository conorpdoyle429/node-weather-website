const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=dcdf5bde3b9f15ad3344c7763858fc19&query=${lat},${long}&units=m`
    request({ url, json: true}, (error, { body }) => {
        const {current, error: responseError} = body
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (responseError) {
            callback('Unable to find location', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, observation_time, weather_icons} = current
            callback(undefined, `${weather_descriptions[0]}. As of ${observation_time} it is ${temperature} degrees out. It feels like ${feelslike} degrees out`)
        }
    })
}

module.exports = forecast