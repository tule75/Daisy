const jwt = require('jsonwebtoken')
const User = require('../app/models/Users')
const GioHang = require('../app/models/GioHang')

module.exports = {
    getCounts: function (slug) {
        const count = 0
        GioHang.find({user_slug: slug})
        .then(data => {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    count = count + data[i].count;
                }
            }
            else {
                count = count;
            }
        })
        .catch(err => {res.status(400).send("loi")})
    }
}