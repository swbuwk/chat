import api from "../http";

export default class ChatService {
    static async getMessagesFromChat(id) {
        return api.get(`/chat/room${id}/messages`)
    }

    static async getMembersFromChat(id) {
        return api.get(`/chat/room${id}/members`)
    }

    static async getGlobalChatsInfo() {
        return api.get("/chat/rooms")
    }

    static async getPrivateChatsInfo(userId) {
        return api.get(`/chat/rooms/${userId}`)
    }

    static async checkPrivateChat(id) {
        return api.get(`/chat/${id}`)
    }

    static async createPrivateChat(id) {
        return api.post(`/chat/${id}`)
    }
}