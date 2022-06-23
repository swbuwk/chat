const db = require("../db.js")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const mailService = require("./mail_service.js")
const tokenService = require("./token_service.js")
const UserDto = require("../dtos/user_dto.js")
const ApiError = require("../exceptions/api_error.js")

class UserService {
    async registartion (name, email, password) {
        const candidate = await db.query("SELECT * FROM person WHERE email = $1", [email])
        if (candidate.rows.length > 0) {
            throw ApiError.badRequest(`Пользователь с таким email уже существует`, "email")
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await db.query("INSERT INTO person (name, email, password, activation_link) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, hashPassword, activationLink])

        await db.query("UPDATE person SET isonline = true WHERE email = $1", [email])

        const userDto = new UserDto(user.rows[0])

        await mailService.sendActivationMail(email, `https://jwt-chat.herokuapp.com/api/activate/${activationLink}`)

        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate (activationLink) {
        const user = await db.query("SELECT * FROM person WHERE activation_link = $1", [activationLink])
        console.log(user.rows)
        if (user.rows.length === 0) {
            throw ApiError.badRequest("Некорректная ссылка активации", "activation_link")
        }
        await db.query("UPDATE person SET is_activated = true WHERE activation_link = $1", [activationLink])
    }

    async login (email, password) {
        const user = await db.query("SELECT * FROM person WHERE email = $1", [email])
        if (user.rows.length === 0) {
            throw ApiError.badRequest("Пользователь с таким email не найден", "email")
        }

        const isPasswordEqual = await bcrypt.compare(password, user.rows[0].password)
        if (!isPasswordEqual) {
            throw ApiError.badRequest("Введен неверный пароль", "password")
        }

        await db.query("UPDATE person SET isonline = true WHERE email = $1", [email])

        const userDto = new UserDto(user.rows[0])
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken, email) {
        const token = await tokenService.removeToken(refreshToken)
        await db.query("UPDATE person SET isonline = false WHERE email = $1", [email])
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unAthuorizedError()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiError.unAthuorizedError()
        }


        const user = await db.query("SELECT * FROM person WHERE id = $1", [userData.id])

        const userDto = new UserDto(user.rows[0])
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await db.query("SELECT * FROM person")
        return users.rows
    }

    
    async getOneUser(id) {
        const user = await db.query("SELECT * FROM person WHERE id = $1", [id])
        return user.rows[0]
    }
}

module.exports = new UserService()