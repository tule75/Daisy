const User = require('../models/Users')
var jwt = require('jsonwebtoken');

class LogInController {
    // [GET] /sellerlogin 
    gLogIn(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id, role: 'seller'})
            .then(data => {
                if (data) {
                    res.redirect('/kenhnguoiban')
                } else {
                    res.render('seller-login.html', {check: 0})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.render('seller-login.html', {check: 0})
        }
    }
    
    // [POST] /Login
    pLogIn(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        User.findOne({username: username, password: password})
            .then(data => {
                if (data){
                    if (data.role === 'seller') {
                        const token = jwt.sign({ _id: data._id }, 'daisy');
                        res.cookie('token', token, 20)
                        res.redirect('/kenhnguoiban')
                    } else {
                        res.render('seller-login.html', {check: 1})
                    }
                } else {
                    res.render('seller-login.html', {check: 1})
                }
            })
            .catch(err => {
                console.log(err);
                res.send('loi')
            }
        );
    }
}
  
  module.exports = new LogInController();