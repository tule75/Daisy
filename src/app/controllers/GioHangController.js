const GioHang = require('../models/GioHang')
const User = require('../models/Users')
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')

class GioHangController {
    // [POST] /...
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
                GioHang.findOne({user_slug: user_slug, product_slug: product_slug})
                .then((data) => {
                    //nếu có
                    if (data) {
                        // biến đếm + 1
                        const count = data.count + 1;
                        //cập nhật biến đếm
                        GioHang.updateOne({ user_slug: user_slug, product_slug: product_slug}, {$set: {count: count}})
                        .then(data => {
                            // res.clearCookie('token')
                            // res.cookie('token', token, 20)

                            //chuyển đến trang chủ
                            res.redirect('/')})
                        .catch(err => res.send(err))
                    } else {
                        //nếu không thì tạo document mới
                        var gioHang = new GioHang({user_slug: user_slug, product_slug: product_slug, count: 1})
                        gioHang.save()
                        .then(data => {
                            // res.clearCookie('token')
                            // res.cookie('token', token, 20)
                            res.redirect('/')})
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
    //[GET] /giohang
    lay(req, res, next) {
        var products = [];
        var user;
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    user = data

                    GioHang.find({user_slug: data.slug})
                    .then(cart => {
                         //sản phẩm trong giỏ
                        var counts = 0
                        var i = 0
                        // for (var i = 0; i < cart.length; i++){
                        // // while (i < data.length){
                        //     // counts += cart[i].count
                        //     Product.findOne({slug: cart[i].product_slug})
                        //     .then((product) => {
                        //         if (product != null){
                        //             var p = {};
                        //             p.name = product.name;
                        //             p.slug = product.slug;
                        //             p.price = product.price;
                        //             // p.count = cart[i].count;
                        //             p.img = product.img;
                        //             p.user_id = product.user_id;
                        //             // console.log(product)
                        //             console.log(p)
                                    
                        //             products.push(p);
                        //             // console.log(products)
                        //         }
                        //         // i++;
                        //     })
                        //     .catch(err => {})
                        // }

                        function resolveAfter2Seconds(x) {
                            return new Promise((resolve) => {
                              setTimeout(() => {
                                resolve(x);
                              }, 1000);
                            });
                        }

                        var promise = new Promise( function(resolve, reject) {
                            let pr = [];
                            cart.forEach((element, i) => {
                                counts += element.count
                                Product.findOne({slug: element.product_slug})   
                                .then((product) => {
                                    if (product != null){
                                        var p = {};
                                        p.name = product.name;
                                        p.slug = product.slug;
                                        p.price = product.price;
                                        p.count = cart[i].count;
                                        p.img = product.img;
                                        p.user_id = product.user_id;
                                        // console.log(product)
                                        // console.log(p)
                                        
                                        pr.push(p);
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
                            res.render('giohang.html', {products: pr, check: 1, user: user, countCart: counts})
                        })
                        
                        
                    })
                    .catch(err => {res.send("loi")})
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

module.exports = new GioHangController()