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
    },
    updateTaskName: async (id, taskName, ownerUsername) => {
        if (!await Tasks.findOne({ where: {id, ownerUsername} } )) {
            throw 404
        }
        await Tasks.update({taskName}, { where: {id, ownerUsername} })
    }
}

module.exports = TaskService