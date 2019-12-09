const mongoose = require('mongoose')
const orderSchema = require('./order.schema.server')
module.exports = mongoose.model('order', orderSchema)