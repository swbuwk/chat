const db = require("../db")
const chatService = require("../service/chat_service")

class ChatController {
    async getPublicRooms(req, res, next) {
        try {
            const rooms = (await db.query("SELECT * FROM room WHERE private = false")).rows
            return res.json(rooms)
        } catch(e) {
            next(e)
        }
    }

    async getPrivateRooms(req, res, next) {
        try {
            const {id} = req.params
            const rooms = await chatService.getPrivateRooms(id)
            return res.json(rooms)
        } catch(e) {
            next(e)
        }
    }

    async createRoom(req, res, next) {
        try {
            const {room} = req.params
            await chatService.createRoom(room)
            return res.json("Комната создана")
        } catch(e) {
            next(e)
        }
    }

    async getRoom(req, res, next) {
        try {
            const {room} = req.params
            const findedRoom = (await db.query("SELECT * FROM room WHERE id = $1", [`room${room}`])).rows
            return res.json(findedRoom)
        } catch(e) {
            next(e)
        }
    }

    async getRoomMessages(req, res, next) {
        try {
            const {room} = req.params
            const query = "SELECT m.content AS message, m.type, p.name, p.id FROM message m JOIN person p ON p.id = m.person_id WHERE m.room_id = $1 ORDER BY m.id"
            const messages = (await db.query(query, [room])).rows
            return res.json(messages)
        } catch(e) {
            next(e)
        }
    }

    async getRoomMembers(req, res, next) {
        try {
            const {room} = req.params
            const query = "SELECT p.id, p.name FROM room_member rm JOIN person p ON p.id = rm.person_id WHERE rm.room_id = $1"
            const members = (await db.query(query, [room])).rows
            return res.json(members)
        } catch(e) {
            next(e)
        }
    }

    async addMemberToRoom(req, res, next) {
        try {
            const {room} = req.params
            const {user_id} = req.body
            const members = await chatService.addMemberToRoom(room, user_id)
            return res.json(members)
        } catch(e) {
            next(e)
        }
    }

    async deleteMemberFromRoom(req, res, next) {
        try {
            const {room} = req.params
            const {user: user_id} = req.query
            await db.query("DELETE FROM room_member WHERE person_id = $1 AND room_id = $2", [user_id, room])
            return res.json({message: "Пользователь вышел из комнаты"})
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new ChatController()