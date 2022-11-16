const GioHang = require('../models/GioHang')
const User = require('../models/Users')
var jwt = require('jsonwebtoken');
const Product = require('../models/Product')

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
        var user_slug;
        if (req.cookies.token){
            const token = req.cookies.token
            const slug = jwt.verify(token, 'daisy')
            User.findOne({slug: slug})
            .then(data => {
                if (data) {
                    user_slug = data.slug
                } else {
                    res.redirect('/login')
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.redirect('/login')
        }

        GioHang.find({user_slug: user_slug})
        .then(data => {
            var products;
            var count = data.count;
            var dem = 0;
            for (var i = 0; i < data.length; i++){
                Product.findOne({slug: product_slug})
                .then(data => {
                    products[dem] = data
                    products[dem].count = count
                    dem += 1
                })
                .catch(err => {res.send("loi")})
            }
            res.render('giohang', {products: products})
        })
        .catch(err => {res.send("loi")})
    }
}

module.exports = new GioHangController()