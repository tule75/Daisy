const User = require('../models/Users')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')
const Bill = require('../models/Bill')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const jwt = require('jsonwebtoken')
const { resolve } = require('bluebird')


class NguoiBanController {
    //[POST] /kenhnguoiban/create
    create(req, res, next) {
        var product = new Product(req.body)
        product.count = 0;
        const token = req.cookies.token
        const id = jwt.verify(token, 'daisy')
        User.findOne({_id: id})
        .then(user => {
            product.user_slug = user.slug
        })
        product.price_discount = product.price
        product.save()
        .then(() => {res.redirect('/kenhnguoiban')})
    }


    //[GET] /kenhnguoiban
    show(req, res, next) {
        if (req.cookies.token){
            function resolveAfter2Seconds(x) {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve(x);
                  }, 1000);
                });
            }
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id, role: 'seller'})
            .then(user => {
                if (user) {
                    let b = []
                    let user_buy = new Array
                    let product_buy = new Array
                    // dùng for loop
                    // (Product.find({user_slug: user.slug}))
                    // .then(products => {
                    //     var p = []
                    //     for (var i = 0; i < products.length; i++) {
                    //     // products.forEach(async (element, i) => {
                    //         Promise.all([GioHang.findOne({product_slug: products[i].slug})])
                    //         .then((data) => {
                    //             // setTimeout(() => {p[i] = data.length},100);
                    //             p.push(data.length)
                    //             // setTimeout(() => {console.log(i)},1000);
                    //             // i++;
                    //         })
                    //         .catch(err => {})
                    //     // });
                    //     }
                    //     // setTimeout(() => {console.log(-1)},1000); 
                    //     // res.render('kenhnguoiban.html', {products: products, user: user, check: 1, countCart: 0})
                    //     // setTimeout(() => {res.send(p); return},1000); 
                    //     res.send(p)                
                        
                    // dùng tương tự bên giỏ hàng

                    Product.find({user_slug: user.slug})
                    .then(products =>{
                        var promise = new Promise( function(resolve, reject) {
                            let pr = [];
                            Bill.find({shop_slug: user.slug, send: 0, sell: 0})
                            .then(bills => {
                                b = bills
                                bills.forEach((element, i) => {
                                    User.findOne({slug: element.user_slug})
                                    .then((user) => {
                                        user_buy[i] = user
                                    })
                                    .catch((err) => {})
    
                                    Product.findOne({slug: element.user_slug})
                                    .then((product) => {
                                        product_buy[i] = product
                                    })
                                    .catch((err) => {})
                                })
                            })

                            
                            products.forEach((element, i) => {
                                GioHang.find({product_slug: element.slug})
                                .then((data) => {
                                    if (data != null){
                                        // console.log(product)
                                        console.log(i)
                                        
                                        pr[i] = data.length
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
                            console.log(b)
                            console.log(product_buy)
                            console.log(user_buy)
                            console.log(-1)
                            // res.render('giohang.html', {products: pr, check: 1, user: user, countCart: counts})
                            res.render('kenhnguoiban.html', {products: products, user: user, check: 1, countCart: 0, boGio: pr, users_buy: user_buy, products_buy: product_buy, bills: b})
                            //res.send(pr)
                            

                        })
                        
                    })




                    // dùng foreach
                        // products.forEach(async (element, index) => {
                        //     GioHang.find({product_slug: element.slug})
                        //     .exec()
                        //     .then(function (data) {
                        //         // Đếm số lượng giỏ hàng chứa sản phẩm, vd sau mà ko xóa giỏ thì có thể thêm trường đã mua chưa để thêm vào cho nó ko trùng
                        //         console.log(index)
                        //         if (data)
                        //             products[index].countC = data.length
                        //     })
                        //     .catch(err => {})
                        // })
                        // return products
                    // })
                    // .then(products => {
                        // console.log(-1)
                        // // res.render('kenhnguoiban.html', {products: products, user: user, check: 1, countCart: 0})
                        // res.send(products);
                    // })
                    // res.render('kenhnguoiban.html', {user: user})
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

module.exports = new NguoiBanController()
