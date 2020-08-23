const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static directory to serve
app.use(express.static(publicDirPath))


//Setup routes for the application
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nanda Vikas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nanda Vikas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Nanda Vikas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'A address is required to fetch the weather data'
        })
    }

    console.log(req.query.address)
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, response) => {
            if (error) {
                return res.send({
                    error
                })


            }
            res.send({
                forecast: response,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        'products': []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Nanda Vikas',
        error: 'Help data not found!'
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        name: 'Nanda Vikas',
        error: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});