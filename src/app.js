const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
// can use viewsPath is views folder had a different name
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directories
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Conor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Conor'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Conor',
        message: 'You clearly need help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    } 

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        name: 'Conor',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page',
        name: 'Conor',
        error: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})