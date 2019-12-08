const mongoose = require('mongoose');
const order = mongoose.Schema({
   buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
   book : {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
 }, {
    timestamps: true
 }, { collection: 'order' })
 
 module.exports = order;