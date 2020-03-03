const express = require('express');
const router = express.Router();
const { Genre, joiValidate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET all genres
router.get('/', async ( req, res ) => {

    throw new Error('Could not get the genres');
    // Get genres from DB
    const genres = await Genre.find().sort('name');

    // Send all genres
    res.send(genres);
});

// POST a new genre
router.post('/', auth, async ( req, res ) => {


    // Validate genre criteria
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create new genre entry 
    let genre = new Genre({ name: req.body.name });

    // Add genre to array
    genre = await genre.save();

    // Return posted genre
    res.send(genre);
    
});

// PUT to a genre
router.put('/:id', async ( req, res ) => {

    // Validate genre criteria from API call
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Find and update genre if exists in DB
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { name: true });

    // Return error if genre doesn't exist in DB
    if (!genre) return res.status(404).send("Genre not found!");

    // Return updated genre
    res.send(genre);
    
});

// DELETE a genre
router.delete('/:id', [auth,admin], async ( req, res ) => {

    // Find and delete genre if exists in DB
    const genre = await Genre.findByIdAndRemove(req.params.id);

    // Return error if genre doesn't exist in DB
    if (!genre) return res.status(404).send("Genre not found!");

    // Return removed genre
    res.send(genre);
    
});

// GET a single genre
router.get('/:id', async ( req, res) => {

    // Find genre 
    const genre = await Genre.findById(req.params.id);

    // Return error if genre doesn't exist in DB
    if (!genre) return res.status(404).send("Genre not found");

    // Return genre
    res.send(genre);

});

module.exports = router;