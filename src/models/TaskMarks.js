const db = require("../db"),
    { DataTypes } = require("sequelize")

const TaskMark = db.define("TaskMarks", {
    done: DataTypes.BOOLEAN
})

module.exports = TaskMark