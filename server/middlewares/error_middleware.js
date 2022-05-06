const ApiError = require("../exceptions/api_error.js")

module.exports = function(err, req, res, next) {
    console.log(err)
    if (err instanceof ApiError) {
        res.status(err.status).json({message: err.message, errors: err.errors, type: err.type})
    } else {
        res.status(500).json({message: "Непредвиденная ошибка"})
    }
}