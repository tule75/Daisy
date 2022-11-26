const Product = require('../models/Product')
const jwt = require('jsonwebtoken')

class DiscountController {
    //[POST] /product/discount
    pDiscount(req, res, next) {
        Product.findOne({slug: req.body.slug})
        .then((product) => {
            product.price_discount = product.price * (100 - req.body.discount)/100
            product.save()  
            .then(() => {res.redirect('/kenhnguoiban')})
            .catch()
        })
    }
}

module.exports = new DiscountController()