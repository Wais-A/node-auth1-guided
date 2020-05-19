const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')

const sessionConfig = {
  name: 'choclateChip',
  secret: 'mySecrectCookie',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, // should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false
}
module.exports = server => {
  // hides "powered by express"
  server.use(helmet())
  // allows us to use json
  server.use(express.json())
  // allows us to use other sites on our website
  // CORS essentially means cross - domain requests.
  server.use(cors())
  // uses empress-session
  server.use(session(sessionConfig))
}
// added all the environmental modules in their own file
