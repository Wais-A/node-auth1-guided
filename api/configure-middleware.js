const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet()); // hides "powered by express"
  server.use(express.json()); // allows us to use json
  server.use(cors()); // allows us to use other sites on our website
  // CORS essentially means cross - domain requests.
};
// added all the environmental modules in their own file