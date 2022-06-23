const db = require('../db')

class ChatService {
    async getPrivateRooms(roomId) {
        const query = `SELECT * FROM room WHERE id LIKE 'room${roomId}-%' OR id LIKE 'room%-${roomId}'`
        const rooms = await db.query(query)
        return rooms.rows
    }

    async createRoom(roomId) {
        const ids = roomId.split("-")
        const names = (await db.query("SELECT name FROM person WHERE id = $1 OR id = $2", [ids[0], ids[1]])).rows
        await db.query("INSERT INTO room (id, name, private) VALUES ($1, $2, true)", [`room${roomId}`, `${names[0].name} - ${names[1].name}`])
    }

    async addMemberToRoom(roomId, userId) {
        await db.query("INSERT INTO room_member (person_id, room_id) VALUES ($1, $2)", [userId, roomId])
        const members = await db.query("SELECT p.id, p.name FROM room_member rm JOIN person p ON p.id = rm.person_id WHERE rm.room_id = $1", [roomId])
        return members.rows
    }
}

module.exports = new ChatService()