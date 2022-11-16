const newRouteHome = require("./site")
const newRouteLogIn = require("./login")
const newRouteSignup = require("./signup")
const newRouteGioHang = require("./giohang")
const newRouteUser = require("./user")
const newRouteShop = require("./shop")

function route(app) {
    app.use("/giohang", newRouteGioHang)
    app.use("/shop", newRouteShop)
    app.use("/user", newRouteUser)
    app.use("/signup", newRouteSignup)
    app.use("/login", newRouteLogIn)
    app.use("/", newRouteHome)
}

module.exports = route