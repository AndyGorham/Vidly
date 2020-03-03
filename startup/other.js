const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db'); // Debugger used to replace 'console.log()'
const morgan = require('morgan'); // Log server request info

module.exports = function(app){
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
}