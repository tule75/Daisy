const User = require('../models/Users')
const WishList = require('../models/WishList')
const Product = require('../models/Product')
const GioHang = require('../models/GioHang')
const jwt = require('jsonwebtoken')

class WLController{
    //[POST] /wishlist/find
    find(req, res, next) {
        const phone = req.body.phone
        console.log(phone)
        User.findOne({phone: phone})
        .then(data => {
            console.log(data)
            if (data) {
                res.redirect('/wishlist/' + data.slug)
            } else {
                res.send('tài khoản không tồn tại' +  phone)
            }
        })
        .catch(err => {res.send('loi cmnr')})
    }


    //[POST] /wishlist/add
    add(req, res, next) {
        var user_slug;
        var product_slug;
        var token;
        if (req.cookies.token){
            // lấy token được lưu trong cookie
            token = req.cookies.token
            // lấy id từ token được lưu
            const id = jwt.verify(token, 'daisy')
            //kiểm tra id có hợp lệ không
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    // nếu có thì gán user.slug
                    user_slug = data.slug
                } else {
                    //không thì chuyển đến login
                    res.redirect('/login')
                }

            //slug sản phẩm
                product_slug = req.body.slug;

                //tìm trong db giỏ hàng có document nào trùng của user_slug và product_slug không
                WishList.findOne({user_slug: user_slug, product_slug: product_slug})
                .then((data) => {
                    //nếu có
                    if (data) {
                        res.status(204).send('Đã có trong wishlist')
                    } else {
                        //nếu không thì tạo document mới
                        var wishlist = new WishList({user_slug: user_slug, product_slug: product_slug, count: 1})
                        wishlist.save()
                        .then(data => {
                            // res.clearCookie('token')
                            // res.cookie('token', token, 20)
                            res.status(204).send('thêm thành công')})
                        .catch(err => res.send('loi'))
                    }
                })
                .catch((err)=> res.status(400).send(err))
            })
            .catch(err => {
                res.send('err')
            })
        } else {
            //nếu cookie không có token thì chuyển đến login
            res.redirect('/login')
        }
    }

    //[GET] /wishlist/:slug
    show(req, res, next) {
        var receiver;
        var user;
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    user = data
                    if (user.slug === req.params.slug) {
                        res.redirect('/user/' + req.params.slug)
                    } else {
                        User.findOne({slug: req.params.slug})
                        .then(data => {
                            receiver = data;
                        })

                        WishList.find({user_slug: req.params.slug})
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

                            function resolveAfter2Seconds(x) {
                                return new Promise((resolve) => {
                                setTimeout(() => {
                                    resolve(x);
                                }, 1500);
                                });
                            }

                            var promise = new Promise( function(resolve, reject) {
                                let pr = [];
                                wl.forEach((element, i) => {
                                    Product.findOne({slug: element.product_slug})   
                                    .then((product) => {
                                        if (product !== null){
                                                                                       
                                            // console.log(p)
                                            
                                            pr.push(product);
                                            console.log(product) 
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
                                console.log(pr)
                                res.render('wishlist.html', {products: pr,receiver: receiver, check: 1, user: user, countCart: counts})
                            })
                            .catch(err => {res.send('loi')})
                            
                            
                        })
                        .catch(err => {res.send("loi")})
                    }
                }
                else { res.redirect('/login')}
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = new WLController()