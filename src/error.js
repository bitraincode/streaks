function ServiceError(statusCode, message) {
    this.name = "ServiceError"
    this.message = message
    this.statusCode = statusCode
}

ServiceError.prototype = new Error

module.exports = {
    ServiceError
}