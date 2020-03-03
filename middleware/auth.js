const jwt = require('jsonwebtoken');
const config = require('config');

// Ensure user with correct JWT is accessing
module.exports = function ( req, res, next ){

    // Confirm any token exists
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied.  No token provided.');

    try{
        // Verify token is correct
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        // Add user to request
        req.user = decodedPayload;
        // Pass execution along 
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token.');
    }
}