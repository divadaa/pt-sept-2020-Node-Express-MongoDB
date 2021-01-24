const route = require('express').Router()
const express = require('express')
const app = express()


route.use('/landings', require('./landings.js'))
route.use('/neas', require('./neas.js'))


// Middleware para el enrutado de Landings

// Middleware para el enrutado de los NEAs

// Middleware para el enrutado de Users

module.exports = route