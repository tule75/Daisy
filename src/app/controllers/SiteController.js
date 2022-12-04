const path = require('path')
const Notify = require('../models/Notify')
var jwt = require('jsonwebtoken');
const Product = require('../models/Product')
const User = require('../models/Users')
const GioHang = require('../models/GioHang')

class SiteController {
    //[GET] /
    index(req, res){
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    var counts = 0
                    GioHang.find({user_slug: data.slug})
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
                    const user = data

                    var shops = []
                    User.find({role: 'seller'})
                    .then(data => {shops = data})

                    Product.find()
                        .then(products => {
                            Notify.find({user_slug: user.slug})
                            .then((no) => {
                                if (no) {
                                    res.render('home.html', {products: products, check: 1, user: user, countCart: counts, shops: shops, notify: no})
                                } else {
                                    res.render('home.html', {products: products, check: 1, user: user, countCart: counts, shops: shops, notify: []})
                                }
                            })
                            
                            // res.json(products)
                        })
                        .catch(err => {res.send(err)})
                } else {
                    Product.find()
                        .then(products => {
                            var shops = []
                            User.find({role: 'seller'})
                            .then(data => {shops = data
                            res.render('home.html', {products: products, check: 0, countCart: 0, shops: shops})
                            })

                            // res.json(products)
                        })
                        .catch(err => {res.send('loi')})
                }
            })
            .catch(err => {
                res.send('loi qq')
            })
        } else {
            Product.find()
                .then(products => {
                    var shops = []
                    User.find({role: 'seller'})
                    .then(data => {shops = data

                        res.render('home.html', {products: products, check: 0, countCart: 0, shops: shops})
                    })

                    // res.json(products)
                })
                .catch(err => {res.send('loi')})
        }
        
    }
    //[GET] /:slug
    showSlug(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    //check countCart
                    var counts = 0
                    GioHang.find({user_slug: data.slug})
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

                    Product.findOne({ "slug": req.params.slug })
                    .then(product => {
                        res.render('product.html', {product: product, check: 1, user: data, countCart: counts})
                        // res.json(laptop)
                    })
                    .catch(err => {res.json(err)})
                } else {
                    Product.findOne({ "slug": req.params.slug })
                    .then(product => {
                        res.render('product.html', {product: product, check: 0, countCart: 0})
                        // res.json(laptop)
                    })
                    .catch(err => {res.json(err)})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            Product.findOne({ "slug": req.params.slug })
            .then(product => {
                res.render('product.html', {product: product, check: 0, countCart: 0})
                // res.json(laptop)
            })
            .catch(err => {res.json(err)})
        }
    }

}

module.exports = new SiteController()