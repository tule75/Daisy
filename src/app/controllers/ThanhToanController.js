class ThanhToanController {
    show(req, res, next) {
        res.render('thanhtoan.html', {check: 1, countCart: 0})
    }
}

module.exports = new ThanhToanController()