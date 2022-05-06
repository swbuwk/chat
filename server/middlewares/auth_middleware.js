const ApiError = require("../exceptions/api_error")
const tokenService = require("../service/token_service")

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.unAthuorizedError())
        }

        const accessToken = authHeader.split(" ")[1]
        if (!accessToken) {
            return next(ApiError.unAthuorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.unAthuorizedError())
        }

        req.user = userData
        next()
    } catch(e) {
        return next(ApiError.unAthuorizedError())
    }
}