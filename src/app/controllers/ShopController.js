const User = require('../models/Users')
var jwt = require('jsonwebtoken')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')

class UserController {
    //[GET] /user/:slug
    show(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(customer => {
                if (customer) {
                    var counts = 0
                    GioHang.find({user_slug: customer.slug})
                    .then(dataa => {
                        if (dataa) {
                            for (var i = 0; i < dataa.length; i++) {
                                counts += dataa[i].count;
                            }
                        }
                        else {
                            counts = counts;
                        }
                    })
                    .catch()

                    User.findOne({slug: req.params.slug})
                    .then(shop => {
                        if (shop) {
                            Product.find({user_slug: shop.slug})
                            .then(products => {
                                res.render('shop.html', {shop: shop, check: 1, user: customer, countCart: counts, products: products});
                            })
                        }
                        else {
                            res.send('không tồn tại')
                        }
                    })
                    .catch(err => {res.send(err.message)});
                } else {
                    User.findOne({slug: req.params.slug})
                    .then(shop => {
                        if (shop) {
                            Product.find({user_slug: shop.slug})
                            .then(products => {
                                res.render('shop.html', {shop: shop, check: 0, countCart: 0, products: products});
                            })
                            .catch(err => {res.send(er.message)})
                        }
                        else {
                            res.send('không tồn tại')
                        }
                    })
                    .catch(err => {res.send(err.message)})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            User.findOne({slug: req.params.slug})
                .then(shop => {
                    if (shop) {
                        Product.find({user_slug: shop.slug})
                        .then(products => {
                            res.render('shop.html', {shop: shop, check: 0, countCart: 0, products: products});
                        })
                    }
                    else {
                        res.send('không tồn tại')
                    }
                })
                .catch(err => {res.send(err.message)})
        }    
    }
}

module.exports = new UserController();