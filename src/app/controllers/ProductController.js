const Product = require('../models/Product')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')

// test
class ProductController {
    //[Post] /product/create
    create(req, res, next) {
        if (req.cookies.token) {
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                var product = new Product(req.body)
                product.user_slug = user.slug
                product.save()
                .then(() => {
                    res.status(204).send('add success')
                })
                .catch(err => {
                    res.status(204).send(err)
                })
            })
            .catch(err => {res.status(404).send(err)})
        } else {
            res.redirect('login')
        }
    }
}



module.exports = new ProductController()