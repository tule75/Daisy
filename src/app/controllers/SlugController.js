const Product = require('../models/Product')
const User = require('../models/Users')
const GioHang = require('../models/GioHang')
const jwt = require('jsonwebtoken')

class SlugController {
    show(req, res, next) {
        let shop_products = []
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


                    const customer = data
                    Product.findOne({slug: req.params.slug})
                    .then(data => {
                        if (data) {
                            User.findOne({slug: data.user_slug})
                            .then(shop => {
                                if (shop) {
                                    Product.find({user_slug: shop.slug})
                                    .then((products) => {
                                        if (products) {
                                            res.render('product.html', {product: data, check: 1, shop: shop, user: customer, countCart: counts, products: products});
                                        }
                                        else {
                                            res.render('product.html', {product: data, check: 1, shop: shop, user: customer, countCart: counts, products: []});
                                        }
                                    })
                                    .catch(err => {
                                        res.send('loi')
                                    })
                                }
                                else {
                                    res.send('sai link')
                                }
                            })
                            .catch(err => {
                                res.send('loi')
                            })
                        }
                        else {
                            res.send('không tồn tại')
                        }
                    })
                } else {
                    Product.findOne({slug: req.params.slug})
                    .then(data => {
                        if (data) {
                            User.findOne({slug: data.user_slug})
                            .then(shop => {
                                if (shop) {
                                    Product.findOne({user_slug: shop.slug})
                                    .then((products => {
                                        if (products) {
                                            res.render('product.html', {product: data,shop: shop, check: 0, countCart: 0, products: products});
                                        }
                                        else {
                                            res.render('product.html', {product: data,shop: shop, check: 0, countCart: 0, products: []})
                                        }
                                    }))
                                    .catch(err => {
                                        res.send('loi')
                                    })
                                }
                                else {
                                    res.send('sai link')
                                }
                            })
                            .catch(err => {
                                res.send('loi')
                            })
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
            Product.findOne({slug: req.params.slug})
                .then(data => {
                    if (data) {
                        User.findOne({slug: data.user_slug})
                        .then(shop => {
                            if (shop) {
                                Product.findOne({user_slug: shop.slug})
                                .then((products => {
                                    if (products) {
                                        res.render('product.html', {product: data,shop: shop, check: 0, countCart: 0, products: products});
                                    }
                                    else {
                                        res.render('product.html', {product: data,shop: shop, check: 0, countCart: 0, products: []})
                                    }
                                }))
                                .catch(err => {
                                    res.send('loi')
                                })
                            }
                            else {
                                res.send('sai link')
                            }
                        })
                        .catch(err => {
                            res.send('loi')
                        })
                    }
                    else {
                        res.send('không tồn tại')
                    }
                })
        }

    }
}

module.exports = new SlugController()