module.exports = {
    ZaloGetAccessToken: function (app_id = 4505605744146995753, secret_key = 'Hhx6YET14IwRTsX1D7AE', code = 'abc') {
        const request = require('request');
        // const secret_key = "Hhx6YET14IwRTsX1D7AE";
        const Content_Type = "application/x-www-form-urlencoded";
        // const code = "abc" // chưa có OA để get code
        // var app_id = 4505605744146995753;
        
        const options = {
            hostname: 'https://oauth.zaloapp.com',
            path: '/v4/oa/access_token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'secret-key': secret_key
            },
            form: {
                code: code,
                app_id: app_id,
                grant_type: 'authorization_code',
            }
        }

        request(options, (err, response) => {
            if(!err) {
                console.log('success get access_token')
                return response;
            }
            else {
                console.log('fail get access_token')
                return err;
            }
        })
    }
}