const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.Promise = require('bluebird');

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: String,
    weigh: Number,
    introduction: String,
    proceduce: String,
    effect: String,
    img: String,
    guide: String,
    presevartion: String,
    user_slug: String,
    countC: Number,
    slug: { type: String, slug: "name", unique: true},
    user_id: String,
    count: Number,
    price: Number,
    price_discount: Number,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('product', Product)