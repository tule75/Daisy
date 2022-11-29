const https = require('https');

class MomoController {
    //[POST] /createmomo
    thanhtoan(req, res, next) {
    console.log(1)
    let x = 0;
    if (req.body) {        
        console.log(req.body)
        function resolveAfter2Seconds(x) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(x);
              }, 3000);
            });
        }

        var promise = new Promise(async function(resolve, reject) {
            let pr = '';
            let i = 0;
            for (var p in req.body) {
                console.log(req.body[p])
                // if (isJson(req.body[p])) {
                    console.log(1)
                    let r = JSON.parse(req.body[p]);
                    x += r.money
                    console.log(i)
                    pr += req.body[p] + '&';
                    i++
                // }
            };
            if (pr) {
                resolve(pr)
            } else {
                reject()
            }
        })
        promise.then(async (pr) => {
            pr = await resolveAfter2Seconds(pr)
            console.log(pr)
            return pr;
        })
        .then((data) => {
            var accessKey = 'F8BBA842ECF85';
            var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
            var orderInfo = 'thanh toán hàng hóa';
            var partnerCode = 'MOMO';
            var redirectUrl = 'localhost:3000';
            var ipnUrl = 'localhost:3000/createbill';
            var requestType = "payWithMethod";
            var amount = x;
            var orderId = partnerCode + new Date().getTime();
            var requestId = orderId;
            // var extraData = new Buffer(data, 'base64');
            var extraData = data;
            var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
            var orderGroupId ='';
            var autoCapture =true;
            var lang = 'vi';

            var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

            const crypto = require('crypto');
            var signature = crypto.createHmac('sha256', secretKey)
                .update(rawSignature)
                .digest('hex');

            const requestBody = JSON.stringify({
                partnerCode : partnerCode,
                partnerName : "Test",
                storeId : "MomoTestStore",
                requestId : requestId,
                amount : amount,
                orderId : orderId,
                orderInfo : orderInfo,
                redirectUrl : redirectUrl,
                ipnUrl : ipnUrl,
                lang : lang,
                requestType: requestType,
                autoCapture: autoCapture,
                extraData : extraData,
                orderGroupId: orderGroupId,
                signature : signature
            });

            const options = {
                hostname: 'test-payment.momo.vn',
                port: 443,
                path: '/v2/gateway/api/create',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestBody)
                }
            }

            const request = https.request(options, response => {
                response.setEncoding('utf8');
                response.on('data', (body) => {
                    console.log(body)
                    if (JSON.parse(body).shortLink != undefined) {
                        res.redirect(JSON.parse(body).shortLink)
                    }  else {
                        res.send(JSON.parse(body).message)
                    }
                });
                response.on('end', () => {
                    console.log('xong');
                });
            })
            // console.log(x)
            request.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });
            request.write(requestBody);
            request.end('')
                })
        }
    }
    
}

module.exports = new MomoController()