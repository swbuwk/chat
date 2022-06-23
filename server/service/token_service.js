const jwt = require("jsonwebtoken")
const db = require("../db.js")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await db.query("SELECT * FROM token WHERE person_id = $1", [userId])
        if (tokenData.rows.length > 0) {
            await db.query("UPDATE token SET refresh_token = $1 WHERE person_id = $2", [refreshToken, userId])
        } else {
            await db.query("INSERT INTO token (refresh_token, person_id) VALUES ($1, $2)", [refreshToken, userId])
        }

    }

    async removeToken(refreshToken) {
        const tokenData = await db.query("SELECT refresh_token FROM token WHERE refresh_token = $1", [refreshToken])
        await db.query("DELETE FROM token WHERE refresh_token = $1", [refreshToken])

        return tokenData.rows[0].refresh_token
    }

    async findToken(refreshToken) {
        try {
            const tokenData = await db.query("SELECT refresh_token FROM token WHERE refresh_token = $1", [refreshToken])
            return tokenData.rows[0].refresh_token
        } catch(e) {
            return null
        }
    }
}

module.exports = new TokenService()