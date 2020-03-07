const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

module.exports = function(){
    // Connect to MongoDB 
    const db = config.get('db');
    mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}