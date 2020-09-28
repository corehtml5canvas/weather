const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Weather',
    name: 'Pouts'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Here is how you use this app',
    name: 'Pouts',
  })
})

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Pouts',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  forecast(req.query.address, (error, response) => {
    if (error) {
      return res.send({
        error
      })
    }

    const { address, location, weather, temperature, feelslike} = response;

    res.send({
      forecast: `${location}. ${weather}. The temperature is ${temperature} and it feels like ${feelslike}`,
      location,
      address,
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: `Help article ${req.url} Not Found`,
    name: 'Pouts',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: `${req.url} Not Found`,
    name: 'Pouts',
  })
})

app.listen('9000', () => {
  console.log('Server is running on port 9000')
})