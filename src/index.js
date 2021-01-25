const express = require('express'),
    app = express(),
    PORT = 3000,
    bodyParser = require('body-parser'),
    { Sequelize } = require('sequelize'),
    sequelize = new Sequelize('', 'root', 'root', {
        host: "localhost",
        dialect: "mysql"
    })

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})