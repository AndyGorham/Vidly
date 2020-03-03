module.exports = function ( req, res, next ){
    
    // Check if user is admin from the 'user' object passed on by the 'auth' middleware
    if (!req.user.isAdmin) return res.status(403).send('Access denied.  User is not admin.')

    // Pass control to next middleware function if user is admin
    next();
}