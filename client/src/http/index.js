import axios from "axios";

const API_URL = "https://jwt-chat.herokuapp.com/api"
const SERVER_URL = "https://jwt-chat.herokuapp.com"
// const API_URL = "http://localhost:5000/api"
// const SERVER_URL = "http://localhost:5000"

export {API_URL, SERVER_URL}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
            const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            const accessToken = res.data.accessToken
            localStorage.setItem("token", accessToken)
            return api.request(originalRequest)
        } catch(e) {
            console.log(e)
        }
    }
    throw error
})

export default api