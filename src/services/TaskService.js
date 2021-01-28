const { Tasks } = require("../models/index")

const TaskService = {
    createTask: async (taskName, ownerUsername) => {
        if (await Tasks.findOne({ where: {taskName, ownerUsername} } )) {
            throw {
                statusCode: 409,
                message: "Task is already exist"
            }
        } else {
            await Tasks.create({
                taskName,
                ownerUsername
            })
        }
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