const { TaskService } = require("../services"),
    { catchError } = require("../util"),
    authenticateToken = require("../authenticateToken")

const router = require("express").Router()

router.post("/tasks", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskService.createTask(req.body.taskName, req.auth.username)
  
    res.sendStatus(201)
}))

router.get("/tasks", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    const tasks = await TaskService.getAllTasks(req.auth.username)

    res.status(200).json(tasks)
}))

router.patch("/tasks/:id", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskService.updateTaskName(req.params.id, req.body.taskName, req.auth.username)
    
    res.sendStatus(200)
}))

router.delete("/tasks/:id", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskService.deleteTask(req.params.id, req.auth.username)
    
    res.sendStatus(204)
}))

module.exports = router