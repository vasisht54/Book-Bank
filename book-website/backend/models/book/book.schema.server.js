
const mongoose = require('mongoose');
const image = require('./image.schema.server');
const price = require('./price.schema.server');

const book = mongoose.Schema({
    title: String,
    authors: { type : Array , "default" : [] },
    publisher : String,
    publishedDate: String,
    description: String,
    industryIdentifiers: { type : Array , "default" : [] },
    pagecount: Number,
    categories:{ type : Array , "default" : [] },
    image : image,
    language: String,
    Price: price,   
 }, {
    timestamps: true
 }, { collection: 'book' })
 
 module.exports = book;

