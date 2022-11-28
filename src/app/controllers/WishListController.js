class VoucherController{
    //[GET] /wishlist
    show(req, res, next) {
        res.render('wishlist')
    }
}

module.exports = new VoucherController()