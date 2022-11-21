const { render } = require('ejs')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')

class NguoiBanController {
    show(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id, role: 'seller'})
            .then(data => {
                if (data) {
                    // Thiếu render thêm các bill được tạo
                    res.render('kenhnguoiban.html', {user: data})
                } else {
                    res.render('login.html', {check: 0})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.render('login.html', {check: 0})
        }
    }
}

module.exports = new NguoiBanController()