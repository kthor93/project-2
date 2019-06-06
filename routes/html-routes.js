var path = require("path");

module.exports = function (app) {
    //path to my profile page
    app.get("/profile", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"))
    })
    // path to home/landing page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    // path to plant survey/plant results
    app.get("/plant", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/plant.html"))
    })

    // path to about page
    app.get("/about", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"))
    })
}