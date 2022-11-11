const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Daisy');
        console.log('connect success')
    } catch (error) {
        console.log('khong connect duoc db')
    }
}

module.exports = { connect }