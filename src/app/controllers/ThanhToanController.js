const User = require('../models/Users')
const Product = require('../models/Product')


class ThanhToanController {
    //[POST] /thanhtoan/create
    push(req, res, next) {
        
    }

    //[GET] /thanhtoan/cart
    showC(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                if (user) {
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

                    // Product.findOne({slug: req.params.slug})
                    // .then(product => {
                    //     User.findOne({slug: product.user_slug})
                    //     .then(shop => {
                    //         res.render('thanhtoan.html', {check: 1, product: product, user: user, countCart: counts, shop: shop})
                    //     })
                    //     .catch(err => res.send('loi'))
                    // })
                    // .catch(err => {res.send('loi')});
                } else {
                    res.render('login.html', {check: 0})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.render('login.html', {check: 0})
        }
    }
    //[GET] /thanhtoan/:slug
    showO(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                if (user) {
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

                    Product.findOne({slug: req.params.slug})
                    .then(product => {
                        User.findOne({slug: product.user_slug})
                        .then(shop => {
                            res.render('thanhtoan.html', {check: 1, product: product, user: user, countCart: counts, shop: shop})
                        })
                        .catch(err => res.send('loi'))
                    })
                    .catch(err => {res.send('loi')});
                } else {
                    res.render('login.html', {check: 0})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.render('login.html', {check: 0})
        }
        
    }
}

module.exports = new ThanhToanController()