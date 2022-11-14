const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const GioHang = new Schema({
    user_slug: String,
    product_slug: String,
    count: Number,
})

module.exports = mongoose.model('cart', GioHang)