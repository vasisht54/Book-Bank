const mongoose = require('mongoose')
const accesorySchema = require('./accessories.schema.server')
module.exports = mongoose.model('accesory', accesorySchema);