const path = require('path')
const { mutipleMongoosetoObject } = require('../../until/mongoose')
var jwt = require('jsonwebtoken');
const { mongoosetoObject } = require('../../until/mongoose')
const Product = require('../models/Product')
const User = require('../models/Users')

class SiteController {
    //[GET] /
    index(req, res){
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    Product.find()
                        .then(products => {
                            res.render('home.html', {products: products, check: 1})
                            // res.json(products)
                        })
                        .catch(err => {res.send('loi')})
                } else {
                    Product.find()
                        .then(products => {
                            res.render('home.html', {products: products, check: 0})
                            // res.json(products)
                        })
                        .catch(err => {res.send('loi')})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            Product.find()
                .then(products => {
                    res.render('home.html', {products: products, check: 0})
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