const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

// Define DB schema for movies
const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

// Create DB model for movie
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreID: Joi.objectID().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    };
    return Joi.validate(movie, schema);
}

exports.joiValidate = validateMovie;
exports.Movie = Movie;