const Sequelize = require('sequelize')

// Person model

module.exports = [
  'person', {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
  }
]

