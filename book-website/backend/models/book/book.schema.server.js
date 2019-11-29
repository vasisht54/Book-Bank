
const mongoose = require('mongoose');
const image = require('./image.schema.server');
const price = require('./price.schema.server');

const book = mongoose.Schema({
    title: {
       type:String,
       unique: true,
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
    
 }, {
    timestamps: true
 }, { collection: 'book' })
 
 module.exports = book;

