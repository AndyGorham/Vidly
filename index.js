const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const express = require('express');
const logger = require('./middleware/Logger');
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres'); 
const customers = require('./routes/customers');  
const home = require('./routes/home');
const mongoose = require('mongoose');

// Create Express instance
const app = express();

// Connect to MongoDB 
mongoose.connect('mongodb://localhost/genres')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// Middleware
app.use(express.json()); // Parse JSON requests to be readable by server
app.use(express.urlencoded({ extended: true })); // Enable encoding body requests in URL
app.use(express.static('public')); // Serve static content
app.use(helmet()); // Third-party app for header security
app.use(logger); // Self-created middleware

// Set up routes
app.use('/api/genres', genres); // Genre routes
app.use('/api/customers', customers); // Customer routes
app.use('/', home); // Homepage route

// Set up Pug templating engine
app.set('view engine', 'pug');
app.set('views', './views'); // Default location to store views


// Enable request logging if development environment
if (app.get('env') === 'development'){
    app.use(morgan('tiny')); // Third-party app for logging server request info
    startupDebugger('Morgan enabled...')
}

// DB placeholder
dbDebugger('Connected to DB...');

// Test configuration settings
// console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail server: ${config.get('mail.host')}`);

// Set up port
const port = process.env.PORT || 3000;

// Set up server to listen on port
app.listen(port, () => console.log(`Listening on port ${port}...`))

