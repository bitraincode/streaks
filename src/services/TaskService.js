const { Tasks } = require("../models/index")

const TaskService = {
    createTask: async (taskName, ownerUsername) => {
        await Tasks.create({
            taskName,
            ownerUsername
        })
    },
    getAllTask: async (ownerUsername) => {
        return await Tasks.findAll({
            where: {
                ownerUsername,
            }
        })
    }
}

module.exports = TaskService