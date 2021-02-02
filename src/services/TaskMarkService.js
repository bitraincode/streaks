const {ServiceError} = require("../error"),
    { Task } = require("../models"),
    { TaskMark } = require("../models");

userCheck = async (username, taskId) => {
    return await Task.findByPk(taskId)
        .then(task => {
            return task.ownerUsername === username
        })
}

const TaskMarkService = {
    createMark: async (taskId, username, done) => {
        if (!await userCheck(username, taskId)) {
            throw new ServiceError(403, "Forbidden error")
        }
        await TaskMark.create({taskId, done})

        // if (new Date().toLocaleDateString() === lastMark.createdAt.toLocaleDateString() ) {
        //     throw new ServiceError(400, "You have already marked this task today")
        // }
        // const lastMark = await TaskMark.findAndCountAll({
        //     where: {
        //         taskId
        //     }
        // }).then(res => {
        //     return res.rows[res.count-1]
        // })
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