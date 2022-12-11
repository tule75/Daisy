const Product = require('../models/Product')
const Notify = require('../models/Notify')
const GioHang = require('../models/GioHang')
const jwt = require('jsonwebtoken')

class DiscountController {
    //[POST] /product/discount
    pDiscount(req, res, next) {
        Product.findOne({slug: req.body.slug})
        .then((product) => {
            product.price_discount = product.price * (100 - req.body.discount)/100;
            GioHang.find({product_slug: req.body.slug})
            .then((carts) => {
                if (carts) {
                    function resolveAfter2Seconds(x) {
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            resolve(x);
                          }, 500);
                        });
                    }

                    var promise = new Promise( function(resolve, reject) {
                        let pr = [];
                        carts.forEach((element, i) => {
                            var no = new Notify({user_slug: element.user_slug, data: `Sản phẩm ${product.name} trong giỏ hàng của bạn đang được giảm giá`})
                            no.save()
                            .then(()=> {
                                pr[i] = 1
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
                        product.save()  
                        .then(() => {res.status(204).send('xong')})
                        .catch(() => {res.send('loi')})
                    })
                    .catch(() => {res.status(400).send(err.message)})
                } else {
                    product.save()  
                    .then(() => {res.status(204).send('xong')})
                    .catch(() => {res.send('loi')})
                }
            })
            .catch(() => {res.status(204).send('loi')})
        })
        .catch(() => {res.status(204).send('loi')})
    }

    //[POST] /product/discount/delete
    dDiscount(req, res, next) {
        Product.findOne({slug: req.body.slug})
        .then((product) => {
            product.price_discount = product.price;
            product.save()
            .then(() => {res.status(204).send('xong')})
            .catch(() => {res.send('loi')})
        })
        .catch((err) => {res.status(500).send(err.message)})
    }
}

module.exports = new DiscountController()