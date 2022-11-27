const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.Promise = require('bluebird');

mongoose.plugin(slug)
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const voucher = new Schema({
    code: String,
    product_slug: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('voucher', voucher)