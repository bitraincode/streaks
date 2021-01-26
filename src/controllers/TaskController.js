const taskRouter = require("express").Router(),
    { TaskService } = require("../services/index")

taskRouter.post("/create", (req, res) => {
    TaskService.createTask(req.body.taskName, req.body.ownerUsername)
    res.sendStatus(200)
})

module.exports = taskRouter