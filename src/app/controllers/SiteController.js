const path = require('path')
const { mutipleMongoosetoObject } = require('../../until/mongoose')
var jwt = require('jsonwebtoken');
const { mongoosetoObject } = require('../../until/mongoose')
const { getCounts } = require('../../until/countCarts')
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
                    Product.find()
                        .then(products => {
                            res.render('home.html', {products: products, check: 1, user: user, countCart: counts})
                            // res.json(products)
                        })
                        .catch(err => {res.send(err)})
                } else {
                    Product.find()
                        .then(products => {
                            res.render('home.html', {products: products, check: 0, countCart: 0})
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
                    res.render('home.html', {products: products, check: 0, countCart: 0})
                    // res.json(products)
                })
                .catch(err => {res.send('loi')})
        }
        
    }
    //[GET] /:slug
    showSlug(req, res, next) {
        Product.findOne({ "slug": req.params.slug })
            .then(product => {
                res.render('product.html', {product: product})
                // res.json(laptop)
            })
            .catch(err => {res.json(err)})
    }

}

module.exports = new SiteController()