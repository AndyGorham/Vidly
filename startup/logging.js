const winston = require('winston'); // Error logging module
// require('winston-mongodb'); // Doesn't work with Jest
require('express-async-errors'); // Replace async error middleware (doesn't seem to work)

module.exports = function(){

    // Set up error handling for synchronous errors outside of Express pipeline 
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'}));

    // Same as above with 'process' approach
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message,ex);
    //     process.exit(1);
    // });

    // Set up error handling for asynchronous errors outside of Express pipeline (not handled by Winston)
    process.on('unhandledRejection', (ex) => {
        // winston.error(ex.message,ex);
        // process.exit(1);
        throw ex // above lines used if 'winston.handleExceptions()'not used
    });

    // Set up Winston to log to a file and then MongoDB
    winston.add(winston.transports.File, { filename: 'logfile.log'});
    // winston.add(winston.transports.MongoDB, { 
    //     db: 'mongodb://localhost/vidly',
    //     level: 'error' // only send error messages (not debug messages)
    // });

    // throw new Error('Test error!'); // Test error
    // const p = Promise.reject(new Error('Promise failed miserably...'))
    //     .then(() => console.log('Done'));
}