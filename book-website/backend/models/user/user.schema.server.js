const mongoose = require('mongoose');
const admin = require('./admin.schema.server.js');
const buyer = require('./buyer.schema.server.js');
const seller = require('./seller.schema.server.js');

const user = mongoose.Schema({
 first_name: {
     type: String,
     required: true,
     trim: true,
     minlength:3,
     maxlength:10
    },
 last_name: {
    type: String,
   required: true,
    trim: true,
    minlength:3,
    maxlength:10
   },
 username: {
    type: String,
   required: true,
    unique:true,
    trim: true,
    minlength:3,
    maxlength:20
   },
 password: {
    type: String,
    required: true,
    trim: true,
    minlength:3,
    maxlength:10
   },
 userType: {
    type: String,
   required: true,
    trim: true,
    minlength:5,
    maxlength:10
   },
 admin: admin,
 buyer: buyer,
 seller:seller
},{
    timestamps:true
}, {collection: 'user'})

module.exports = user;