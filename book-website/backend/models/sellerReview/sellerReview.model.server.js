const mongoose = require('mongoose')
const sellerReviewSchema = require('./SellerReview.schema.server')
module.exports = mongoose.model('sellerReview', sellerReviewSchema);