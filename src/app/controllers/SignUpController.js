const User = require('../models/Users')

class SignInController {
    // [POST] /signup/cp
    Signup(req, res, next) {
        if (req.body.username){
            var username = req.body.username
            User.findOne({username: username})
            .then((data) => {
                if (data) {
                    res.send('trùng tên tài khoản')
                } else {
                    const user = new User(req.body)
                    user.save()
                    .then(()=> res.redirect('/login'))
                    .catch(err => res.send('loi'))
                }
            })
            .catch((err)=> res.status(400).send(err))
        }
    }
}

module.exports = new SignInController()