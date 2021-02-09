const {ServiceError} = require("../error"),
    { Task } = require("../models"),
    { TaskMark } = require("../models"),
    { Op } = require("sequelize")
;

userCheck = async (username, taskId) => {
    return await Task.findByPk(taskId)
        .then(task => {
            return task.ownerUsername === username
        })
}

const TaskMarkService = {
    createMark: async (taskId, username, done, date) => {
        if (!await userCheck(username, taskId)) {
            throw new ServiceError(403, "Forbidden error")
        }

        date = new Date(Date.parse(date))
        date.setHours(0, 0, 0, 0)
        date = date.getTime()

        const mark = await TaskMark.findAll({
            where: {
                taskId,
                createdAt: {
                    [Op.between]: [ date, date + 86399000 ]
                }
            }
        })

        if (mark.length) {
            throw new ServiceError(400, "You have already marked this task today")
        }
        await TaskMark.create({taskId, done, createdAt: date})

    },
    getMarksByTaskId: async (username, id) => {
        if (await userCheck(username, id)) {
            return await TaskMark.findAll({
                where: {
                    taskId: id
                }
            })
        }
        throw new ServiceError(403,"Forbidden error")
    },
    updateMark: async (taskId, markId, username, isDone) => {
        if (! await userCheck(username, taskId)) {
            throw new ServiceError(403, "Forbidden error")
        }
        await TaskMark.findByPk(markId)
            .then(async mark => {
                mark.done = isDone
                await mark.save()
            })
    },
    deleteMark: async (taskId, markId, username) => {
        if (! await userCheck(username, taskId)) {
            throw new ServiceError(403, "Forbidden error")
        }
        await TaskMark.findByPk(markId).then( mark => {
            mark.destroy()
        })
    }
}

module.exports = TaskMarkService