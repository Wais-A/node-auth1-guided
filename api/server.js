const express = require('express');

const apiRouter = require('./api-router.js');
const authRouter = require('../auth/auth-router');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api', apiRouter);
server.use('/api/auth', authRouter)

module.exports = server;
