const { ServiceError } = require("../error")
const { Task } = require("../models")

const TaskService = {
    createTask: async (taskName, ownerUsername) => {
        if (await Task.findOne({ where: { taskName, ownerUsername } } )) {
            throw new ServiceError(400, "Task already exists.")
        } else {
            await Task.create({
                taskName,
                ownerUsername
            })
        }
    },
    getAllTasks: async (ownerUsername) => {
        return await Task.findAll({
            where: {
                ownerUsername,
            }
        })
    },
    updateTaskName: async (id, taskName, ownerUsername) => {
        if (!await Task.findOne({ where: { id, ownerUsername } })) {
            throw new ServiceError(404, "Given task was not found.")
        }
        await Task.update({taskName}, { where: {id, ownerUsername} })
    },
    deleteTask: async (id, ownerUsername) => {
        if (!await Task.findOne({ where: {id, ownerUsername} } )) {
            throw new ServiceError(404, "Given task was not found.")
        }
        await Task.destroy({ where: { id } })
    }
}

module.exports = TaskService