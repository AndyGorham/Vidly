const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/other')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// Set up port
const port = process.env.PORT || 3000;

// Set up server to listen on port
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`))

module.exports = server;

