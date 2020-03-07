const config = require('config');

module.exports = function(){
    // Check if JWT private key is defined in environment variable
    if (!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}
}