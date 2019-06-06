var db = require('../models');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function (app) {
  app.get('/api/users', function (req, res) {
    db.User.findAll().then(function (users) {
      res.json(users);
    });
  });

  app.post('/api/users', function (req, res) {
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (response) {
      plants = response.results;
      db.Plant.findAll({
        where: {
          commonName: {
            [Op.or]: plants
          }
        }
      }).then(function (response) {
        res.json(response)
      })
    })
  })

  app.get('/api/plants', function (req, res) {
    db.Plant.findAll().then(function (plants) {
      res.json(plants);
    });
  });

  app.post('/api/plants', function (req, res) {
    const potSize = (req.body.plantType == "noPreference" ? "medium" : req.body.potSize);
    const isPoisonous = (req.body.isPoisonous == 0 ? [0] : [0, 1]);
    const name = req.body.name;
    const email = req.body.email;
    db.Plant.findAll({
      where: {
        isPoisonous: {
          [Op.or]: isPoisonous
        },
        totalDifficulty: {
          [Op.between]: [req.body.diffRangeStart, req.body.diffRangeEnd]
        },
        temperature: {
          [Op.substring]: req.body.temperature
        },
        light: {
          [Op.substring]: req.body.light
        },
        plantType: {
          [Op.or]: req.body.plantType
        },
        potSize: {
          [Op.substring]: potSize
        }
      }
    }).then(function (response) {
      const results = [];
      response.forEach(function (plant) {
        results.push(plant.dataValues.commonName)
      })
      console.log(results);
      db.User.create({
        name: name,
        email: email,
        results: results
      })
      res.json(response)
    })
  })
}
