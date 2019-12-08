const mongoose = require('mongoose');

const cart = mongoose.Schema({
   buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   book : {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
 }, {
    timestamps: true
 }, { collection: 'cart' })
 
 module.exports = cart;