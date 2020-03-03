const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User, joiValidate } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

// POST new user
router.post('/', async ( req, res ) => {

    // Validate user fields
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Ensure user doesn't already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    // Create user using Lodash to remove duplicate 'req.body' references
    user = new User (_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    /** Above function without Lodash
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    */

    // Save user to DB
    await user.save();

    // Generate JWT
    const token = user.generateAuthToken();

    // Exclude password from return to user
    user = _.pick(user, ['name', 'email'])

    // Send JWT and user model to user
    res.header('x-auth-token', token).send(user);


    // Return user
    res.send(user);
})

// GET current user
router.get('/me', auth, async ( req, res ) => {

    // Find user based on user info passed on by auth middleware function, and exclude password
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

module.exports = router;