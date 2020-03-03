const Joi = require('joi'); // API body validation 

module.exports = function(){
    Joi.objectId = require('joi-objectid')(Joi);
}