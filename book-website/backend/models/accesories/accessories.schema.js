const mongoose = require('mongoose');
const price = require('../book/price.schema.server');

const accessories = mongoose.Schema({
    title: {
       type:String,
       required: true,
   },
    price: price,   
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
 }, {
    timestamps: true
 }, { collection: 'accessories' })
 
 module.exports = accessories;