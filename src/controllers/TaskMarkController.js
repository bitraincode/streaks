const { catchError } = require("../util"),
    { TaskMarkService } = require("../services"),
    router = require("express").Router()

router.get("/:taskId/marks", catchError(async (req, res, next) => {
    const marks = await TaskMarkService.getMarksByTaskId(req.body.ownerUsername, req.params.taskId)
    res.status(200).json(marks)
}))

router.post("/:taskId/marks", catchError(async (req, res, next) => {
    await TaskMarkService.createMark(req.params.taskId, req.body.ownerUsername, req.body.isDone)
    res.sendStatus(200)
}))

router.put("/:taskId/marks/:markId", catchError (async (req, res, next) => {
    await TaskMarkService.updateMark(req.params.taskId, req.params.markId, req.body.ownerUsername, req.body.isDone)
    res.sendStatus(201)
}))

module.exports = router