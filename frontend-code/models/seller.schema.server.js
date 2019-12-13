const mongoose = require('mongoose');
const sellerSchema = mongoose.Schema({
   sellerAgreement: Boolean
});
module.exports = sellerSchema;