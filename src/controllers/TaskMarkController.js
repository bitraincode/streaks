const { catchError } = require("../util"),
    { TaskMarkService } = require("../services"),
    router = require("express").Router(),
    authenticateToken = require("../authenticateToken")

router.get("/:taskId/marks", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    const marks = await TaskMarkService.getMarksByTaskId(req.auth.username, req.params.taskId)
    res.status(200).json(marks)
}))

router.post("/:taskId/marks", catchError(async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskMarkService.createMark(req.params.taskId, req.auth.username, req.body.isDone, req.body.date)
    res.sendStatus(200)
}))

router.patch("/:taskId/marks/:markId", catchError (async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskMarkService.updateMark(req.params.taskId, req.params.markId, req.auth.username, req.body.isDone)
    res.sendStatus(201)
}))

router.delete("/:taskId/marks/:markId", catchError( async (req, res, next) => {
    authenticateToken(req, res, next)
    await TaskMarkService.deleteMark(req.params.taskId, req.params.markId, req.auth.username)
    res.sendStatus(200)
}))

module.exports = router