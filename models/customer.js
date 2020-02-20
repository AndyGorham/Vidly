const mongoose = require('mongoose');
const Joi = require('joi');

//  Define DB schema for customers
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

// Create customer model (class)
const Customer = mongoose.model('Customer', customerSchema);

// Validate function
function joiValidate(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema)
}

exports.joiValidate = joiValidate;
exports.Customer = Customer;