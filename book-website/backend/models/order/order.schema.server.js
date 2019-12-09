const mongoose = require('mongoose');
const order = mongoose.Schema({
   buyer:{
       type: String,
       required: true
   },
   book : {
    type: String,
     required: true},
 quantity:{
    type: Number,
    required: true
},
seller:{
    type: String,
    required: true
}
}, {
    timestamps: true
 }, { collection: 'order' })
 
 module.exports = order;