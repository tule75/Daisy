const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    user_slug: String,
    product_slug: String,
    thoigianban: { type: Date, default: Date.now },
    count: Number,
    money: Number,
    sell: Number,
})

module.exports = mongoose.model('bill', Bill)