const mongoose = require('mongoose');
const Joi = require('Joi');

// Define DB schema for genres
const genreSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// Create DB model for genres
const Genre = mongoose.model('Genre', genreSchema);

// Validation function with Joi NPM package
function joiValidate(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

exports.joiValidate = joiValidate;
exports.Genre = Genre;
exports.genreSchema = genreSchema;




