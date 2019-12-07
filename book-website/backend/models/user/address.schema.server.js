const mongoose = require('mongoose');
const AddressSchema = mongoose.Schema({
   address: {
    type: String,
    required:true,
  },
   pincode:{
    type: Number,
    required:true,
  },
   city: {
    type: String,
    required:true,
  },
   state: {
    type: String,
    required:true,
  },
   country:{
    type: String,
    required:true,
  }
});
module.exports = AddressSchema;