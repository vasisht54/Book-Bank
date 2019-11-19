const mongoose = require('mongoose');
const BuyerSchema = mongoose.Schema({
   buyerAgreement: Boolean
});
module.exports = BuyerSchema;