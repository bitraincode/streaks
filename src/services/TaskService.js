const { Tasks } = require("../models/index")

const TaskService = {
    createTask: async (taskName, ownerUsername) => {
        await Tasks.sync();
        await Tasks.create({
            taskName,
            ownerUsername
        })
    }
}

module.exports = TaskService