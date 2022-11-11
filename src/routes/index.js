const newRouteHome = require("./site")
const newRouteLogIn = require("./login")

function route(app) {
    app.use("/login", newRouteLogIn)
    app.use("/", newRouteHome)
}

module.exports = route