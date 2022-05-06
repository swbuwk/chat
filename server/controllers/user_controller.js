const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api_error.js')
const userService = require('../service/user_service.js')

class UserController {
    async registration(req, res, next) {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                return next(ApiError.badRequest("Неправильно введены некоторые поля", validationErrors.array()))
            }
            const {name, email, password} = req.body
            const userData = await userService.registartion(name, email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie("refreshToken")
            return res.json(token)
        } catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)

        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        } catch(e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.getOneUser(id)
            res.json(user)
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new UserController()