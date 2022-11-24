const User = require('../models/Users')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')
const Bill = require('../models/Bill')
const jwt = require('jsonwebtoken')


class ThanhToanController {
    //[POST] /thanhtoan/create
    push(req, res, next) {
        if (req.body) {
            function resolveAfter2Seconds(x) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(x);
                  }, 1000);
                });
            }
            var customer = new Object();;
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(async (user) => {
                for (let p in req.body) {
                    let product = JSON.parse(req.body[p]);
                    var bill = await resolveAfter2Seconds(new Bill({user_slug: user.slug, shop_slug: product.user_slug, product_slug: product.slug, count: 1, money: product.price, sell: 0}))
                    bill.save()
                    .then(() => {
                        console.log('success')
                        res.redirect('/')
                    })
                    .catch(err => {})
                }
            })
            .catch(err => {})

            

            //lấy key từ req.body
            
        }
    }

    //[GET] /thanhtoan/cart?q=...
    showC(req, res, next) {
        if (req.cookies.token){
            // var products_slug = req.query.p
            if (Array.isArray(req.query.q)){
                var products_slug = req.query.q
            }
            else {
                var products_slug = new Array
                products_slug.push(req.query.q)
            }

            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                if (user) {
                    var counts = 0
                    GioHang.find({user_slug: user.slug})
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

                    function resolveAfter2Seconds(x) {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve(x);
                          }, 1000);
                        });
                    }
    
                    var promise = new Promise( function(resolve, reject) {
                        let pr = [];
                        products_slug.forEach((element, i) => {
                            Product.findOne({slug: element})
                            .then((product) => {
                                if (product != null){
                                    // var p = {};
                                    // p.name = product.name;
                                    // p.slug = product.slug;
                                    // p.price = product.price;
                                    // p.count = cart[i].count;
                                    // p.img = product.img;
                                    // p.user_id = product.user_id;
                                    // console.log(product)
                                    // console.log(p)
                                    
                                    pr[i] = product;
                                    // console.log(products)
                                }
                                // i++;
                            })
                            .catch(err => {})
                        });
                        if (pr) {
                            resolve(pr)
                        } else {
                            reject()
                        }
                    })
                    promise.then(async (pr) => {
                        pr = await resolveAfter2Seconds(pr)
                        User.findOne({slug: pr.user_slug})
                        .then(shop => {
                            res.render('thanhtoan.html', {check: 1, product: pr, user: user, countCart: counts, shop: shop})
                        })
                        .catch(err => res.send('loi'))
                        // res.send(pr)
                        // res.send(pr)
                        // res.send(req.query.p)
                    })

                    // res.send(req.query.p)
                    

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
                console.error(err)
                res.send('loi ne')
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
                    GioHang.find({user_slug: user.slug})
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
                console.error(err)
                res.send('loi')
            })
        } else {
            res.render('login.html', {check: 0})
        }
        
    }
}

module.exports = new ThanhToanController()