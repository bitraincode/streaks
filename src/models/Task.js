const db = require("../db"),
    { DataTypes } = require('sequelize')

module.exports = db.define('Task', {
    ownerUsername: DataTypes.STRING,
    taskName: DataTypes.STRING,
}, {
    updatedAt: false,
})