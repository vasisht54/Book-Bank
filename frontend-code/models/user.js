const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');
module.exports = mongoose.model('User', userSchema);