const { catchError } = require("../util"),
    { TaskMarkService } = require("../services"),
    router = require("express").Router()

router.get("/:taskId/", catchError(async (req, res, next) => {
    const marks = await TaskMarkService.getMarksByTaskId(req.body.ownerUsername, req.params.taskId)
    res.status(200).json(marks)
}))

router.post("/:taskId", catchError(async (req, res, next) => {
    await TaskMarkService.createMark(req.params.taskId)
    res.status(201)
}))

module.exports = router