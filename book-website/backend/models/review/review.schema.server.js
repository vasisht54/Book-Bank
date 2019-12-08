const mongoose = require('mongoose');

const review = mongoose.Schema({
   buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   book : {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
   review: String,
 }, {
    timestamps: true
 }, { collection: 'accessories' })
 
 module.exports = review;