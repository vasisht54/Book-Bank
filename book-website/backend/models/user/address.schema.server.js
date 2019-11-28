const mongoose = require('mongoose');
const AddressSchema = mongoose.Schema({
   address: {
    type: String,
    required:true,
    unique: true, 
  },
   pincode:{
    type: Number,
    required:true,
    unique: true, 
  },
   city: {
    type: String,
    required:true,
    unique: true, 
  },
   state: {
    type: String,
    required:true,
    unique: true, 
  },
   country:{
    type: String,
    required:true,
    unique: true, 
  }
});
module.exports = AddressSchema;