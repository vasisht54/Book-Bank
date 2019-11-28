const mongoose = require('mongoose');
const price = mongoose.Schema({
    amount:Number,
    currency:String,
});
module.exports = price;