const newRouteHome = require("./site")

function route(app) {
    app.use("/", newRouteHome)
}

module.exports = route