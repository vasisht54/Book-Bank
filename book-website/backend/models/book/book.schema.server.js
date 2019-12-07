
const mongoose = require('mongoose');
const image = require('./image.schema.server');
const price = require('./price.schema.server');


const book = mongoose.Schema({
    title: {
       type:String,
      required: true
   },
    authors: { type : Array , "default" : [] },
    publisher : String,
    publishedDate: String,
    description: String,
    industryIdentifiers: { type : Array , "default" : [] },
    pagecount: Number,
    categories:{ type : Array , "default" : [] },
    image : image,
    language: String,
    price: price,   
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
 }, {
    timestamps: true
 }, { collection: 'book' })
 
 module.exports = book;

