const mongoose = require('mongoose');
const reviewTypes = ["GOOD","BAD", "AVERAGE"];
const sellerReview = mongoose.Schema({
   buyer:
   {type: String,
    required: true
   },
   seller :
   {type: String,
      required: true
     },
 review:{
        type:String,
        enum: reviewTypes,
        required:true
     }
 }, {
    timestamps: true
 }, { collection: 'sellerReview' })
 
 module.exports = sellerReview;