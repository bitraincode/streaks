const { Sequelize } = require("sequelize")

module.exports = new Sequelize('streaks', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
})