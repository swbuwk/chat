import api from "../http";

export default class UserService {
    static async getUsers() {
        return api.get("/users")
    }

    static async getUser(id) {
        return api.get(`/users/${id}`)
    }
}