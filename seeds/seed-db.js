const db = require("../models");
const fs = require("fs");
const path = require('path')

let data = fs.readFileSync(path.join(__dirname, "/plants.json"));
let plants = JSON.parse(data);
console.log(data)

db.sequelize.sync({ force: true }).then(function () {
    db.Plant.bulkCreate(plants).then(function () {
        console.log("seeded");
    }).catch(function (err) {
        console.log(err);
    });
})