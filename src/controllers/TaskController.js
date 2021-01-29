const { TaskService } = require("../services"),
    { catchError } = require("../util")

const router = require("express").Router()

router.post("/tasks", catchError(async (req, res, next) => {
    await TaskService.createTask(req.body.taskName, req.body.ownerUsername)
  
    res.sendStatus(201)
}))

router.get("/tasks", catchError(async (req, res, next) => {
    const tasks = await TaskService.getAllTasks(req.body.ownerUsername)

    res.status(200).json(tasks)
}))

router.put("/tasks/:id", catchError(async (req, res, next) => {
    await TaskService.updateTaskName(req.params.id, req.body.taskName, req.body.ownerUsername)
    
    res.sendStatus(200)
}))

router.delete("/tasks/:id", catchError(async (req, res, next) => {
    await TaskService.deleteTask(req.params.id, req.body.ownerUsername)
    
    res.sendStatus(204)
}))

module.exports = router