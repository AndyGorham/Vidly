const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const { Rental, joiValidate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const Fawn = require('fawn');
const auth = require('../middleware/auth');

// Initialize Fawn for transactions (2-phase commits)
Fawn.init(mongoose);

// GET all rentals
router.get('/', async ( req, res ) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

// POST a rental
router.post('/', auth, async ( req, res ) => {

    // Validate request is in proper form
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Validate customer exists
    const customer = await Customer.findById(req.body.customerID);
    if (!customer) return res.status(400).send('Customer does not exist.');

    // Validate movie exists
    let movie = await Movie.findById(req.body.movieID);
    if (!movie) return res.status(400).send('Movie does not exist');

    // Ensure movie is in stock
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    // Create new rental
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        // Arrange new transaction to save rentals and decrement movie stock
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id}, {
            $inc: { numberInStock: -1 }
        })
        .run();

        // Return rental 
        res.send(rental);
    }
    catch (ex){
        // Return error if transaction doesn't work
        res.status(500).send('Something failed.');
    }
});


router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    
    res.send(rental);
    });
    
module.exports = router; 