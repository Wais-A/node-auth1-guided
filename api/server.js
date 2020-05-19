const express = require('express'); // importing express 

const apiRouter = require('./api-router.js'); // importing the api-router
const authRouter = require('../auth/auth-router'); // importing the auth router again but different 
const configureMiddleware = require('./configure-middleware.js'); // importing our environmental modules

const server = express();

configureMiddleware(server); // using the modules and passing in express

server.use('/api', apiRouter); // /api will be are first domain name
server.use('/api/auth', authRouter) // /api/auth is for authRouter

module.exports = server;
