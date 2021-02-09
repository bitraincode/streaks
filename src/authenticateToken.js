const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'],
        token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, auth) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.auth = auth
    })
}

module.exports = authenticateToken