const GioHang = require('../app/models/GioHang')

module.exports = {
    getCounts: async function (slugg) {
        var count = 0
        GioHang.find({user_slug: slugg})
        .then(data => {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    count += data[i].count;
                }
                return count
            }
            else {
                return count
            }
        })
        .catch(err => {return count})
        
    }
}