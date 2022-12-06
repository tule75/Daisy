const newRouteHome = require("./site")
const newRouteLogIn = require("./login")
const newRouteSignup = require("./signup")
const newRouteGioHang = require("./giohang")
const newRouteUser = require("./user")
const newRouteShop = require("./shop")
const newRouteThanhToan = require("./thanhtoan")
const newRouteSellerLogin = require("./seller-login.js")
const newRouteKenhNguoiBan = require("./kenhnguoiban")
const newRouteDiscount = require("./discount")
const newRouteTest = require("./test")
const newRouteWL = require("./wishlist")
const newRouteMomo = require("./momo")
const newRouteProduct = require("./product")
const newRouteZalo = require("./zalo")

function route(app) {
    // app.get('/test', (req, res) => {
    //     var x = [{user_slug: "foo", product_slug: "bar", money: 100, send: 0}, {user_slug: "foo", product_slug: "bar", money: 500, send: 0}]
    //     res.render('test.html', {product: x})
    // })
    app.use('/zalo', newRouteZalo)
    app.use('/product', newRouteProduct)
    app.use('/createmomo', newRouteMomo)
    app.use('/wishlist', newRouteWL)
    // app.use('/testmomo', newRouteTest)
    app.use("/product/discount", newRouteDiscount)
    app.use("/signup", newRouteSellerLogin)
    app.use("/thanhtoan", newRouteThanhToan);
    app.use("/kenhnguoiban", newRouteKenhNguoiBan);
    app.use("/giohang", newRouteGioHang)
    app.use("/shop", newRouteShop)
    app.use("/user", newRouteUser)
    app.use("/signup", newRouteSignup)
    app.use("/login", newRouteLogIn)
    app.use("/", newRouteHome)
}

module.exports = route
