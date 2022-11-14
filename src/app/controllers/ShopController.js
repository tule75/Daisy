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
                    const customer = data
                    User.findOne({slug: req.params.slug})
                    .then(data => {
                        if (data) {
                            res.render('shop.html', {shop: data, check: 1, user: customer})
                        }
                        else {
                            res.send('không tồn tại')
                        }
                    })
                } else {
                    User.findOne({slug: req.params.slug})
                    .then(data => {
                        if (data) {
                            res.render('shop.html', {shop: data, check: 0})
                        }
                        else {
                            res.send('không tồn tại')
                        }
                    })
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            User.findOne({slug: req.params.slug})
                .then(data => {
                    if (data) {
                        res.render('shop.html', {shop: data, check: 0})
                    }
                    else {
                        res.send('không tồn tại')
                    }
                })
        }    
    }
}

module.exports = new UserController();