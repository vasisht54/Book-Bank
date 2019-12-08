const mongoose = require('mongoose');

const review = mongoose.Schema({
   buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   book : String,
 }, {
    timestamps: true
 }, { collection: 'accessories' })
 
 module.exports = review;