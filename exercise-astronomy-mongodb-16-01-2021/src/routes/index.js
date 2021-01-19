const route = require('express').Router()
const express = require('express')
const app = express()


app.use('/', require('./landings.js'))
app.use('/', require('./neas.js'))


// Middleware para el enrutado de Landings

// Middleware para el enrutado de los NEAs

// Middleware para el enrutado de Users

module.exports = route