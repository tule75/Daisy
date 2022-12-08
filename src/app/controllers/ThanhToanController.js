const User = require('../models/Users')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')
const Bill = require('../models/Bill')
const jwt = require('jsonwebtoken')
const Voucher = require('../models/Voucher')
const WishList = require('../models/WishList')

class ThanhToanController {
    //[POST] /createbill
    createbill(req, res, next) {
        if (req.body.resultCode == 0 || req.body.resultCode == 9000 ) {
            console.log(req.body)
            function resolveAfter2Seconds(x) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(x);
                  }, 1000);
                });
            }

            var promise = new Promise(async function(resolve, reject) {
                var pr = []
                // let data = req.body.extraData.toString('base64').split('&');
                let data = req.body.extraData.split('&');
                data.forEach((element, i) => {
                    // if (isJson(req.body[p])) {
                    if (element !== '') {
                        pr[i] = JSON.parse(element);
                        console.log(pr[i])
                    }
                    // }
                });
                if (pr) {
                    resolve(pr)
                } else {
                    reject()
                }
            })
            promise.then(async (pr) => {
                pr = await resolveAfter2Seconds(pr)
                console.log(pr)
                Bill.create(pr)
                .then(() => {
                    console.log(-1)
                    res.status(204).send('da xong')
                })
            })

        } else {
            res.status(204).send('no request')
        }
    }

    //[POST] /thanhtoan/create
    push(req, res, next) {
        if (req.body) {            
            console.log(req.body)
            function resolveAfter2Seconds(x) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(x);
                  }, 3000);
                });
            }

            var promise = new Promise(async function(resolve, reject) {
                let pr = [];
                let i = 0;
                for (var p in req.body) {
                    console.log(req.body[p])
                    // if (isJson(req.body[p])) {
                        console.log(1)
                        pr[i] = JSON.parse(req.body[p]);
                        i++
                    // }
                };
                if (pr) {
                    resolve(pr)
                } else {
                    reject()
                }
            })
            promise.then(async (pr) => {
                pr = await resolveAfter2Seconds(pr)
                console.log(pr)
                Bill.create(pr)
                .then(() => {
                    console.log(-1)
                    res.redirect('/')
                })
            })
            
        }
    }

    //[GET] /thanhtoan/tang?u=...&q=...
    showT(req, res, next) {
        if (req.cookies.token){
            var shops = []
            var products_slug = []
            // var products_slug = req.query.p
            if (req.query) {
                let x = req.query.q
                if (Array.isArray(x)) {
                    for (let i = 0; i < x.length; i++) {
                        products_slug.push(x[i])
                    }
                }
                else {
                    products_slug.push(x)
                }
            }

            let slug = req.query.u
            var receiver;
            User.findOne({slug: slug})
            .then(data => {
                receiver = data
            })
            .catch(err => {})

            console.log(products_slug)

            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                if (user) {
                    var vouchers = []
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
                                    var voucher = []

                                    WishList.findOne({product_slug: product.slug, user_slug: receiver.slug})
                                    .then((data) => {
                                        product.count = data.count
                                    })
                                    .catch(() => {})

                                    Voucher.find({product_slug: product.slug})
                                    .then((data) => {
                                        voucher = data
                                    })
                                    .catch(() => {res.send('loi ne')})

                                    vouchers[i] = voucher

                                    User.findOne({slug: product.user_slug})
                                    .then(shop => {
                                        if (shop != null){
                                        shops.push(shop)
                                        }
                                    })
                                    .catch(err => res.send('loi ne'))

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
                        // res.send(pr)
                        // res.send(pr)
                        // res.send(req.query.p)
                        res.render('thanhtoantang.html', {check: 1, product: pr, user: user, receiver: receiver, countCart: counts, shop: shops, vouchers: vouchers})

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

    //[GET] /thanhtoan/cart?q=...
    showC(req, res, next) {
        if (req.cookies.token){
            var shops = []
            var products_slug = []
            // var products_slug = req.query.p
            if (req.query) {
                for (let p in req.query) {
                    products_slug.push(req.query[p])
                }
            }

            console.log(products_slug)

            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(user => {
                if (user) {
                    var vouchers = []
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
                                if (product !== null){
                                    var voucher = []

                                    GioHang.findOne({product_slug: product.slug, user_slug: user.slug})
                                    .then((data) => {
                                        product.count = data.count
                                    })
                                    .catch(() => {})

                                    Voucher.find({product_slug: product.slug})
                                    .then((data) => {
                                        voucher = data
                                    })
                                    .catch(() => {res.send('loi')})

                                    vouchers[i] = voucher

                                    User.findOne({slug: product.user_slug})
                                    .then(shop => {
                                        console.log(shop)
                                        shops.push(shop)
                                    })
                                    .catch(err => res.send('loi ne'))

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
                        res.render('thanhtoan.html', {check: 1, product: pr, user: user, countCart: counts, shop: shops, vouchers: vouchers})

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
    //[GET] /thanhtoan/:slug?c=...
    showO(req, res, next) {
        let count
        if (req.query.c > 1){
            count = req.query.c;
        }
        else {
            count = 1;
        }
        
        if (req.cookies.token){
            let vouchers;
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
                        product.count = count;

                        Voucher.find({product_slug: product.slug})
                        .then(voucher => {
                            vouchers = voucher
                        })
                        .catch(error => {})

                        User.findOne({slug: product.user_slug})
                        .then(shop => {
                            res.render('thanhtoan.html', {check: 1, product: product, user: user, countCart: counts, shop: shop, vouchers: vouchers})
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