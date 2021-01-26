const sequelize = require("../index"),
    { DataTypes } = require('sequelize')

const Tasks = sequelize.define('Tasks', {
    ownerUsername: DataTypes.STRING,
    taskName: DataTypes.STRING,
},{
    sequelize,
    updatedAt: false
})

module.exports = Tasks