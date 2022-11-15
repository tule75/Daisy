const GioHang = require('../app/models/GioHang')

module.exports = {
    getCounts: function (slugg) {
        var count = 0
        GioHang.find({user_slug: slugg})
        .then(data => {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    console.log(data.user_slug)
                    count += data.count;
                }
            }
            else {
                count = count;
            }
        })
        .catch(count = 0)
        return count
    }
}