const mongoose = require('mongoose');

const cart = mongoose.Schema({
   buyer:{
       type:String,
       required: true
   } ,
   book : {
    type:String,
    required: true
},
quantity:{
    type: Number,
    required: true
}
 }, {
    timestamps: true
 }, { collection: 'cart' })
 
 module.exports = cart;