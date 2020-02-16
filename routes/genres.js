const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Define genres
const genres = [
    { id: 1, name: "action"},
    { id: 2, name: "comedy"},
    { id: 3, name: "drama"},
    { id: 4, name: "horror"},
    { id: 5, name: "romance"}
];

// GET all genres
router.get('/', ( req, res ) => {

    // Send all genres
    res.send(genres);
})

// POST a new genre
router.post('/', ( req, res ) => {

    // Validate genre criteria
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create new genre entry 
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    // Add genre to array
    genres.push(genre);

    // Return posted genre
    res.send(genre);
    
})

// PUT to a genre
router.put('/:id', ( req, res ) => {

    // Verify genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found!");

    // Validate genre criteria
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update genre in array
    genre.name = req.body.name;

    // Return updated genre
    res.send(genre);
    
})

// DELETE a genre
router.delete('/:id', ( req, res ) => {

    // Verify genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Genre not found!");

    // Remove genre from array
    const genreIndex = genres.indexOf(genre);
    genres.splice(genreIndex, 1);

    // Return removed genre
    res.send(genre);
    
})

// Validation function with Joi NPM package
function joiValidate(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;