const db = require("../db"),
    { DataTypes } = require('sequelize'),
    TaskMarks = require('./TaskMarks')

const Tasks = db.define('task', {
    ownerUsername: DataTypes.STRING,
    taskName: DataTypes.STRING,
}, {
    updatedAt: false,
})

Tasks.hasMany(TaskMarks)
TaskMarks.belongsTo(Tasks)

module.exports = Tasks