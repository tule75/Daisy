const User = require('../models/Users')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var jwt = require('jsonwebtoken');
const http = require('node:http');
const { response } = require('express');

class LogInController {
    // [GET] /login 
    gLogIn(req, res, next) {
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id})
            .then(data => {
                if (data) {
                    res.redirect('/')
                } else {
                    res.render('login.html', {check: 0})
                }
            })
            .catch(err => {
                res.send('loi')
            })
        } else {
            res.render('login.html', {check: 0})
        }
    }
    // [POST] /Login
    pLogIn(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        User.findOne({username: username, password: password})
            .then(data => {
                if (data){
                    const token = jwt.sign({ _id: data._id }, 'daisy');
                    res.cookie('token', token, 20)
                    res.redirect('/')
                } else {
                    res.render('login.html', {check: 1})
                }
            })
            .catch(err => {
                console.log(err);
                res.send('loi')
            }
        );
    }
    
    gLogOut(req, res, next) {
        res.clearCookie("token")
        res.redirect('/')
    }

    // ship(req, res, next) {
    //     var dulieu;
    //     const data = {
    //         "from_district_id":1454,
    //         "service_id":53320,
    //         "service_type_id":null,
    //         "to_district_id":1452,
    //         "to_ward_code":"21012",
    //         "height":50,
    //         "length":20,
    //         "weight":200,
    //         "width":20,
    //         "insurance_value":10000,
    //         "coupon": null
    //         }
    //     fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': '637170d5-942b-11ea-9821-0281a26fb5d4',
    //             'ShopId': '885',
    //             'Content-Type': 'text/plain',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //     .then((response) => {console.log(response)})
    //     .catch((err) => res.status(400).send(err));

    //     console.log(dulieu)
    //     res.send('hello')
    // }

    // ship(req, res, next) {
    //     const postData = JSON.stringify({
    //         "from_district_id":1454,
    //         "service_id":53320,
    //         "service_type_id":null,
    //         "to_district_id":1452,
    //         "to_ward_code":"21012",
    //         "height":50,
    //         "length":20,
    //         "weight":200,
    //         "width":20,
    //         "insurance_value":10000,
    //         "coupon": null
    //     })
    //     const options = {
    //         hostname: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Token': '637170d5-942b-11ea-9821-0281a26fb5d4',
    //             'ShopId': '885',
    //             'Content-Type': 'text/plain',
    //         },
    //         body: postData,
    //     }

    //     const request = http.request(options, (res) => {
    //         console.log(`STATUS: ${res.statusCode}`);
    //         console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    //         res.setEncoding('utf8');
    //         res.on('data', (chunk) => {
    //             console.log(`BODY: ${chunk}`);
    //         });
    //         res.on('end', () => {
    //             console.log('No more data in response.');
    //         });
    //     });
    // }

}
  
  module.exports = new LogInController();