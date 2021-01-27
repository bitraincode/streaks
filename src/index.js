const express = require('express'),
    app = express(),
    PORT = 3000,
    bodyParser = require('body-parser'),
    { Sequelize } = require('sequelize'),
    sequelize = new Sequelize('streaks', 'root', 'root', {
            host: "localhost",
            dialect: "mysql"
        })

module.exports = sequelize

app.use(bodyParser.json());
app.use(require("./controllers/index"))

app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server started on port ${PORT}`)
})