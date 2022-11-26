const Voucher = require('../models/Voucher')

class VoucherController{
    //[POST] /kenhnguoiban/addvoucher
    addVoucher(req, res, next) {
        let code = req.body.code
        if (code) {
            let voucher = new Voucher({code: code, product_slug: req.body.product_slug})
            Voucher.save()
            .then(() => {res.redirect('/kenhnguoiban')})
            .catch() 
        }
    }
}