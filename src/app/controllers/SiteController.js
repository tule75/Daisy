const path = require('path')
const { mutipleMongoosetoObject } = require('../../until/mongoose')
const { mongoosetoObject } = require('../../until/mongoose')
const Product = require('../models/Product')

class SiteController {
    //[GET] /
    index(req, res){
        Product.find()
        .then(products => {
            res.render('home.html', {products: products})
            // res.json(products)
        })
        .catch(err => {res.send('loi')})
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