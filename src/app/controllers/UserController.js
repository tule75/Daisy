const User = require('../models/Users')
const WishList = require('../models/WishList')
const Product = require('../models/Product')
var jwt = require('jsonwebtoken')

class UserController {
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
                        var i = 0

                        function resolveAfter2Seconds(x) {
                            return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(x);
                            }, 1000);
                            });
                        }

                        var promise = new Promise( function(resolve, reject) {
                            let pr = [];
                            wl.forEach((element, i) => {
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
                            res.render('customer.html', {products: pr, check: 1, user: user, countCart: counts})
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