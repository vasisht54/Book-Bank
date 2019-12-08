const mongoose = require('mongoose')
const cartSchema = require('./cart.schema.server')
module.exports = mongoose.model('cart', cartSchema)