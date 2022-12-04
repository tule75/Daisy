const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Notify = new Schema({
    user_slug: String,
    data: String,
    thoigiannhan: { type: Date, default: Date.now },
})

module.exports = mongoose.model('thongbao', Notify)