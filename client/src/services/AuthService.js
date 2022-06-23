import api from "../http";

export default class AuthService {
    static async login(email, password) {
        return api.post("/login", {email, password})
    }

    static async registration(name, email, password) {
        return api.post("/registration", {name, email, password})
    }

    static async logout(email) {
        return api.post("/logout", {email})
    }
}