const { render } = require('ejs')
const User = require('../models/Users')

class NguoiBanController {
    show(req, res, next) {
        res.render('kenhnguoiban.html')
    }
}

module.exports = new NguoiBanController()