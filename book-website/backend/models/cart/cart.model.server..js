const mongoose = require('mongoose')
const bookSchema = require('./book.schema.server')
module.exports = mongoose.model('book', bookSchema)