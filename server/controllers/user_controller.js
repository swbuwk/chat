const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api_error.js')
const userService = require('../service/user_service.js')

class UserController {
    async registration(req, res, next) {
        try {
            const validationErrors = validationResult(req)
            if (!validationErrors.isEmpty()) {
                const param = validationErrors.errors[0].param
                if (param === "name")
                return next(ApiError.badRequest("Никнейм должен быть в диапазоне от 2 до 30 символов", validationErrors.array()))
                if (param === "email")
                return next(ApiError.badRequest("Некорректный email", validationErrors.array()))
                if (param === "password")
                return next(ApiError.badRequest("Пароль от 8 до 16 символов", validationErrors.array()))
            }
            const {name, email, password} = req.body
            const userData = await userService.registartion(name, email, password)
            res.cookie("refreshToken", userData.refreshToken, {sameSite: "none", secure: true, maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie("refreshToken", userData.refreshToken, {sameSite: "none", secure: true, maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const {email} = req.body
            const token = await userService.logout(refreshToken, email)
            res.clearCookie("refreshToken", {sameSite: "none"})
            return res.json(token)
        } catch(e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect("https://jwt-chat-client.herokuapp.com/home")
        } catch(e) {
            next(e)
        }
    }

    async sendActivationLink (req, res, next) {
        try {
            const {id} = req.params
            const isActivated = (await db.query("SELECT is_activated FROM person WHERE id = $1", [id])).rows[0].is_activated
            if (isActivated) {
                next(ApiError.badRequest("Ваш аккаунт уже активирован", "activation_link"))
                return
            }
            const info = (await db.query("SELECT activation_link, email FROM person WHERE id = $1", [id])).rows[0]
            mailService.sendActivationMail(info.email, `https://jwt-chat.herokuapp.com/api/activate/${info.activation_link}`)
            return res.json(info.rows)
        } catch(e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {sameSite: "none", secure: true, maxAge: 30 * 24 * 3600 * 1000, httpOnly: true})
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