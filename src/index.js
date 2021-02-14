const express = require('express'),
    bodyParser = require('body-parser'),
    db = require("./db"), 
    { ServiceError } = require('./error'),
    authenticateToken = require("./authenticateToken");

require("dotenv").config()

const app = express(),
    PORT = 3000

app.use(authenticateToken)

app.use(bodyParser.json());
app.use(require("./controllers/index"))

app.use(function (err, req, res, next) {
    if (err instanceof ServiceError) {
        res.status(err.statusCode).send({
            message: err.message
        })
    } else {
        next(err)
    }
})

app.listen(PORT, async () => {
    await db.sync();
    console.log(`Server started on port ${PORT}`)
})