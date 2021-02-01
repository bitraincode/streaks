const db = require("../db")

const TaskMark = db.define("TaskMarks", {},
    {
    updatedAt: false
    })

module.exports = TaskMark