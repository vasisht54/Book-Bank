const mongoose = require('mongoose');

const review = mongoose.Schema({
   buyer:
   {type: String,
    required: true
   },
   book :
   {type: String,
      required: true
     },
   review: 
     {type: String,
      required: true
     }
 }, {
    timestamps: true
 }, { collection: 'review' })
 
 module.exports = review;