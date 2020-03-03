const winston = require('winston');

// Handle errors (e.g. DB disconnection)
module.exports = function(err, req, res, next){
    
    winston.error(err.message, err)
    res.status(500).send('Something failed.');
}