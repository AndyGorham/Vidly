const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Movie, joiValidate } = require('../models/movie.js');
const { Genre } = require('../models/genre.js');
const auth = require('../middleware/auth');

// GET all movies
router.get('/', async ( req, res ) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
})

// POST a movie
router.post('/', auth, async ( req, res ) => {

    // Return error if improper format
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Return error if genre DNE
    const genre = await Genre.findById(req.body.genreID);
    if (!genre) return res.status(400).send('Invalid genre.');

    // Create a new movie
    let movie = new Movie({
        title:  req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    // Save movie to DB
    movie = await movie.save();

    // Return posted movie
    res.send(movie);
})

// PUT a movie
router.put('/:id', auth, async ( req, res ) => {

    // Return error if improper format
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Return error if genre DNE
    const genre = await Genre.findById(req.body.genreID);
    if (!genre) return res.status(400).send('Genre does not exist.')

    // Update movie 
    const movie = await Movie.findByIdAndUpdate(req.params.id, {

        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    // Return error if movie DNE
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    // Return updated movie
    res.send(movie);
})

// DELETE a movie
router.delete('/:id', auth, async ( req, res ) => {

    // Delete movie
    movie = await Movie.findByIdAndRemove(req.params.id);

    // Return error if ID DNE
    if (!movie) return res.status(400).send('Movie does not exist.')

    // Return deleted movie
    res.send(movie);

})

// GET a movie
router.get('/:id', async ( req, res ) =>  {

    // Get movie
    const movie = await Movie.findById(req.params.id);

    // Return error if movie DNE
    if (!movie) return res.status(400).send('Movie does not exist.');

    // Return movie
    res.send(movie);

})

module.exports = router;