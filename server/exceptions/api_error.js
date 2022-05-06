module.exports = class ApiError extends Error {
    status;
    errors;
    type;

    constructor(status, message, errors = [], type) {
        super(message)
        this.status = status
        this.errors = errors
        this.type = type
    }

    static unAthuorizedError() {
        return new ApiError(401, "Пользователь не авторизован", [], "unauthorized")
    }

    static badRequest(message, type, errors = []) {
        return new ApiError(400, message, errors, type)
    }
}