const User = require('../models/Users')
const WishList = require('../models/WishList')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')
const Bill = require('../models/Bill')
var jwt = require('jsonwebtoken')

class UserController {
    //[POST] /user/took
    took(req, res, next) {
        console.log(req.body)
        let bills = JSON.parse(req.body.bill)
        Bill.findOne({user_slug: bills.user_slug, product_slug: bills.product_slug})
        .then(bill => {
            if (bill) {
                Product.findOne({slug: bill.product_slug})
                .then(product => {
                    bill['sell'] = 1;
                    bill.save()
                    .then(() => {
                        var no = new Notify({user_slug: bill.shop_slug, data: `Đơn hàng ${bill._id} sản phẩm ${product.name} của bạn, đã được nhận thành công bởi khách hàng}`})
                        no.save()
                        console.log('success', bill)
                        res.status(204).send('cập nhật thành công')
                    })
                    .catch(err => {
                        res.status(204).send('cập nhật không thành công')
                    })
                })
                .catch(err => {
                    res.status(204).send(err.message)
                })
            }
            else {
                res.status(204).send('cập nhật không thành công')
            }
        })
    }

    //[GET] /user/:slug
    show(req, res, next) {
        var user;
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    user = data;

                    WishList.find({user_slug: data.slug})
                    .then(wl => {
                        //sản phẩm trong giỏ
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
                        var i = 0
                        var bills;
                        

                        function resolveAfter2Seconds(x) {
                            return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(x);
                            }, 1000);
                            });
                        }

                        var promise = new Promise( function(resolve, reject) {
                            let pr = [];
                            let b = [];
                            Bill.find({user_slug: user.slug})
                            .then(bill => {
                                bills = bill
                                bill.forEach((e, index) => {
                                    Product.findOne({slug: e.product_slug})
                                    .then(p => {
                                        console.log(1)
                                        b[index] = p;
                                    })
                                    .catch(() =>{res.send('loi')})
                                })
                            })
                            .catch()
                            
                            
                            wl.forEach((element, i) => {
                                Product.findOne({slug: element.product_slug})   
                                .then((product) => {
                                    // console.log(product)
                                    if (product){
                                        // console.log(product)
                                        // console.log(p)
                                        
                                        pr[i] = product;
                                        // console.log(products)
                                    }
                                    // i++;
                                })
                                .catch(err => {})
                            });
                            if (pr && b !==[]) {
                                resolve([pr, b])
                            } else {
                                reject()
                            }
                        })
                        promise.then(async ([pr, bi]) => {
                            pr = await resolveAfter2Seconds(pr)
                            bi = await resolveAfter2Seconds(bi)
                            console.log(bi)
                            res.render('customer.html', {products: pr, check: 1, user: user, countCart: counts, bills: bills, products_buy: bi})
                        })
                        
                        
                    })
                    .catch(err => {res.send("loi day")})
                }
                
                else { res.redirect('/login')}
            })
            .catch(err => {
                res.send('loi do')
            })
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = new UserController();