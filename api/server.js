// importing express
const express = require('express')
// importing the api-router
const apiRouter = require('./api-router.js')
// importing the auth router again but different
const authRouter = require('../auth/auth-router')
// importing our environmental modules
const configureMiddleware = require('./configure-middleware.js')

// activating express under the server const name
const server = express()

// using the modules and passing in express
configureMiddleware(server)

// /api will be are first domain name
server.use('/api', apiRouter)
// /api/auth is for authRouter
server.use('/api/auth', authRouter)

module.exports = server
