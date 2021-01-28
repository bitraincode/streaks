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

module.exports = taskRouter