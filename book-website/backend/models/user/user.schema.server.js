const mongoose = require('mongoose');
const admin = require('./admin.schema.server.js');
const buyer = require('./buyer.schema.server.js');
const seller = require('./seller.schema.server.js');
const address = require('./address.schema.server.js');
const userTypes = ["buyer", "seller", "admin"];
//embedded obejcts of buyer, seller and address
const user = mongoose.Schema({
   first_name: String,
   last_name: String,
   username: {
     type: String,
     required:true,
     unique: true 
   },
   password: {
      type: String,
      required:true 
    },
   usertype:{
      type: String,
      enum: userTypes,
      required:true
   },
   admin: admin,
   buyer: buyer,
   seller: seller,
   address:address
}, {
   timestamps: true
}, { collection: 'user' })

module.exports = user;