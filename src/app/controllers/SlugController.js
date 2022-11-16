const Product = require('../models/Product')

class SlugController {
    show(req, res, next) {
        Product.findOne({ 'slug': req.params.slug })
            .then(product => {
                res.render('product.html', {product: product})
                // res.json(laptop)
            })
            .catch(next)
    }
}

module.exports = new SlugController()