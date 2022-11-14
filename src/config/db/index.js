const mongoose = require('mongoose')

async function connect() {
    try {
// <<<<<<< HEAD
// <<<<<<< HEAD
        await mongoose.connect('mongodb+srv://daisy:d123456@cluster0.yhe4jws.mongodb.net/Daisy')
// =======
  // await mongoose.connect('mongodb+srv://daisy:d123456@cluster0.yhe4jws.mongodb.net/Daisy');
// >>>>>>> f4a61573f75f6d579fdd5acdf6b59758d748f016
// =======
//         await mongoose.connect('mongodb+srv://daisy:d123456@cluster0.yhe4jws.mongodb.net/Daisy');
// >>>>>>> 342099b39af2cf7e81cd9a78a96911e18d5cdc45
        console.log('connect success')
    } catch (error) {
        console.log('khong connect duoc db')
    }
}

module.exports = { connect }
