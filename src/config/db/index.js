const mongoose = require('mongoose')

async function connect() {
    try {

        await mongoose.connect('mongodb+srv://daisy:d123456@cluster0.yhe4jws.mongodb.net/Daisy')
        console.log('connect success')
    } catch (error) {
        console.log('khong connect duoc db')
    }
}

module.exports = { connect }
