// const { ZaloSendMessage } = require('../../until/sendMessageZalo')
const http = require('http');
const User = require('../models/Users')
const Bill = require('../models/Bill')

class ZaloController {
    //[POST] /zalo/sendmessage
    send(req, res, next) {
        // check phân quyền
        if (req.cookies.token){
            const token = req.cookies.token
            const id = jwt.verify(token, 'daisy')
            User.findOne({_id: id, role: "seller"})
            .then(shop => {
                if (shop) {
                     // thay đổi dựa vào shop( cập nhật sau).
                    const api_key = '99541E2E178D9358D26A536FD5F322'
                    const secret_key = '5171398DF1E5FE665CB28F0C8C2D32'
                    //-------------------------------------------------
                    // Gửi tin nhắn SMS
                    // const requestBody = JSON.stringify({
                    //     "ApiKey": api_key,
                    //     "Content": "Đơn hàng của bạn đã dược xác nhận.",
                    //     "Phone": req.body.phone.toString(),
                    //     "SecretKey": secret_key,
                    //     "IsUnicode": "1",
                    //     "Brandname": "Baotrixemay",
                    //     "SmsType": "2",
                    // })

                    // var options = {
                    //     hostname: 'rest.esms.vn',
                    //     port: 80,
                    //     path: '/MainService.svc/json/SendMultipleMessage_V4_post_json/',
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Content-Length': Buffer.byteLength(requestBody)
                    //     }
                    // }

                    // const request = http.request(options, response => {
                    //     response.setEncoding('utf8');
                    //     response.on('data', (body) => {
                    //         //CodeResult = 103 vì tài khoản trên không đủ tiền.
                    //         console.log(body)
                    //     });
                    //     response.on('end', () => {
                    //         console.log('xong');
                    //         res.status(204).send('success')
                    //     });
                    // })

                    // request.on('error', (e) => {
                    //     console.log(`problem with request: ${e.message}`);
                    //     res.status(204).send('loi')
                    // });
                    // request.write(requestBody);
                    // request.end('')
                    //--------------------------------------------------------
                    // Gửi tin nhắn OA EZNS
                    const template_id = "111111" //yêu cầu shop cung cấp sau
                    // Đơn hàng {{bill id}} của bạn trên sàn uitdaisy.vn đã được gửi thành công.
                    var params = [];
                    Bill.findOne({user_slug: req.body.cus_slug})
                    .then((bill) => {
                        params[0] = bill._id;
                    })
                    var phone;
                    User.findOne({user_slug: req.body.cus_slug})
                    .then(user => {
                        phone = user.phone.toString();
                    })
                    const OAID = "111111" //yêu cầu shop cung cấp sau

                    //multiChannelMessage
                    const requestBody = JSON.stringify({
                        "ApiKey": api_key,
                        "Content": "Đơn hàng của bạn đã dược xác nhận.",
                        "Phone": phone,
                        "SecretKey": secret_key,
                        "Channels": [
                            "zalo",
                            "sms"
                        ],
                        "Data": [
                            {
                                "OAID": OAID,
                                "TempID": template_id,
                                "Params": params,
                            }, {
                                "Content": `Đơn hàng ${params[0]} của bạn trên sàn uitdaisy.vn đã được gửi thành công.`,
                                "IsUnicode": 1,
                                "SmsType": 2,
                                "Brandname": `${shop.name}`,
                            }
                        ],
                    })

                    var options = {
                        hostname: 'rest.esms.vn',
                        port: 80,
                        path: '/MainService.svc/json/MultiChannelMessage/',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(requestBody)
                        }
                    }

                    const request = http.request(options, response => {
                        response.setEncoding('utf8');
                        response.on('data', (body) => {
                            console.log(body)
                        });
                        response.on('end', () => {
                            console.log('xong');
                            res.status(204).send('success')
                        });
                    })

                    request.on('error', (e) => {
                        console.log(`problem with request: ${e.message}`);
                        res.status(204).send('loi')
                    });
                    request.write(requestBody);
                    request.end('')
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
        // const access_token = ZaloSendMessage(app_id = 4505605744146995753, secret_key = 'Hhx6YET14IwRTsX1D7AE', authorization_code = 'abc')['access_token']

        // let phone = req.body.phone.toString();
        // if (phone.substring(0,2) !== '84') {
        //     phone = phone.split('0', '84')
        // }

        // const requestBody = JSON.stringify({
        //     'phone': phone,
        //     "template_id": "7895417a7d3f9461cd2e",

        // });

       
    }
}

module.exports = new ZaloController()