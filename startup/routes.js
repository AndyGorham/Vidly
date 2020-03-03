// Route imports
const express = require('express');
const home = require('../routes/home');
const genres = require('../routes/genres'); 
const customers = require('../routes/customers');  
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

// Misc. middleware imports
const logger = require('../middleware/Logger'); // Sample logger middleware
const helmet = require('helmet'); //  Hader security

module.exports = function(app){
    // Middleware
    app.use(express.json()); // Parse JSON requests to be readable by server
    app.use(express.urlencoded({ extended: true })); // Enable encoding body requests in URL
    app.use(express.static('public')); // Serve static content
    app.use(helmet()); // Third-party app for header security
    app.use(logger); // Self-created middleware

    // Set up routes
    app.use('/', home); // Homepage route
    app.use('/api/genres', genres); // Genre routes
    app.use('/api/customers', customers); // Customer routes
    app.use('/api/movies', movies); // Movies routes
    app.use('/api/rentals', rentals); // Rentals routes
    app.use('/api/users', users); // Users routes
    app.use('/api/auth', auth); // Authentication routes
    app.use(error);
    
}