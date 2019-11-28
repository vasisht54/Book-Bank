const mongoose = require('mongoose');
const image = mongoose.Schema({
    smallThumbnail:String,
    thumbnail:String,
});
module.exports = image;