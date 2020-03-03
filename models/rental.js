const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

// Create rental schema
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }

        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now

    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0,
    }
});

// Make rental model
const Rental = mongoose.model('Rental', rentalSchema);

// Make rental validation function
function validateRental(rental){
    const schema = {
        customerID: Joi.objectId().required(),
        movieID: Joi.objectId().required()
    }
    return Joi.validate(rental, schema);
}

exports.joiValidate = validateRental;
exports.Rental = Rental;