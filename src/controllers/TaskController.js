const taskRouter = require("express").Router(),
    { TaskService } = require("../services/index")

taskRouter.post("/", (req, res) => {
    TaskService.createTask(req.body.taskName, req.body.ownerUsername)
        .then( () => {
            res.sendStatus(200)
    })
        .catch(err => {
            res.status(err.statusCode).send(err.message)
        })
})

taskRouter.get("/", (req, res) => {
    TaskService.getAllTask(req.body.ownerUsername).then( tasks => {
        res.send(JSON.stringify(tasks))
    })
        .catch( err => {
            res.send(err)
        })
})

taskRouter.put("/:id", (req, res) => {
    TaskService.updateTaskName(req.params.id, req.body.taskName, req.body.ownerUsername)
        .then(() => res.sendStatus(200))
        .catch( err => res.sendStatus(err))
})

taskRouter.delete("/:id", (req, res) => {
    TaskService.deleteTask(req.params.id, req.body.ownerUsername)
        .then(() => res.sendStatus(200))
        .catch( err => res.sendStatus(err))
})

module.exports = taskRouter