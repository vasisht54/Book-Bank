const mongoose = require('mongoose')
const orderSchema = require('./cart.schema.server')
module.exports = mongoose.model('order', orderSchema)