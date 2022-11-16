const User = require('../models/Users')
var jwt = require('jsonwebtoken')

class UserController {
    //[GET] /user/:slug
    show(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    if (data.role === 'customer') {
                        res.render('customer.html', {customer: data})
                    } else {
                        // res.render('seller.html', {customer: data})
                    }
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

module.exports = new UserController();