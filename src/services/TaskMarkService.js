const {ServiceError} = require("../error"),
    { Task } = require("../models"),
    { TaskMark } = require("../models");

const TaskMarkService = {
    createMark: async (taskId) => {
        const lastMark = await TaskMark.findAndCountAll({
            where: {
                taskId
            }
        }).then(res => {
            return res.rows[res.count-1]
        })

        if (new Date().toLocaleDateString() === lastMark.createdAt.toLocaleDateString() ) {
            throw new ServiceError(400, "You have already marked this task today")
        }
        await TaskMark.create({taskId})
    },
    getMarksByTaskId: async (username, id) => {
        return await Task.findByPk(id)
                .then( async task => {
                    if (task.ownerUsername === username) {
                        return await TaskMark.findAll({
                            where: {
                                taskId: id
                            }
                        })
                    }
                    throw new ServiceError(403,"Forbidden error")
                })
    },
}

module.exports = TaskMarkService