const express = require('express');
const router = express.Router();
const { Customer, joiValidate } = require('../models/customer');
const auth = require('../middleware/auth');

// GET all customers
router.get('/', async ( req, res ) => {

    // Query customers from DB
    let customers = await Customer.find().sort('name');
    
    // Send customers
    res.send(customers);
    
})

// POST a customer
router.post('/', async ( req, res ) => {

    // Validate that customer meets criteria
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create customer object
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })

    // Save customer to DB
    customer = await customer.save();

    // Return saved customer
    res.send(customer);
})

// PUT a customer
router.put('/:id', auth, async ( req, res ) => {

    // Validate that customer meets criteria
    const { error } = joiValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Find and update customer if exists in DB
    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, { new: true });


    // Return error if customer ID DNE
    if (!customer) return res.status(400).send('Customer not found.');

    // Return updated customer
    res.send(customer);
})

// DELETE a customer
router.delete('/:id', async ( req, res ) => {

    // Find and delete customer if exists in DB
    const customer = await Customer.findByIdAndRemove(req.params.id);

    // Return error if customer ID DNE
    if (!customer) return res.status(404).send('Customer not found.');

    // Return deleted customer
    res.send(customer);
})

module.exports = router;