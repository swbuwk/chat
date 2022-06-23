import AuthService from "../services/AuthService"
import { setUserData, eraseUserData } from "./userSlice"
import axios from "axios"
import { API_URL } from "../http"
import { setError } from "./errorSlice"

export const login = (email, password) => async (dispatch) => {
    try {
        const res = await AuthService.login(email, password)
        const accessToken = res.data.accessToken
        localStorage.setItem("token", accessToken)
        dispatch(setUserData(res.data))
    } catch(e) {
        dispatch(setError(e.response.data))
    }
}

export const registration = (name, email, password) => async (dispatch) => {
    try {
        const res = await AuthService.registration(name, email, password)
        const accessToken = res.data.accessToken
        localStorage.setItem("token", accessToken)
        dispatch(setUserData(res.data))
    } catch(e) {
        dispatch(setError(e.response.data))
    }
}

export const checkAuth = () => async (dispatch) => {
      try {
          const res = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
          const accessToken = res.data.accessToken
          localStorage.setItem("token", accessToken)
          dispatch(setUserData(res.data))
      } catch(e) {
          dispatch(setError(e.response.data))
      }
}

export const logout = (email) => async (dispatch) => {
    try {
        await AuthService.logout(email)
        localStorage.removeItem("token")
        dispatch(eraseUserData())
    } catch(e) {
        dispatch(setError(e.response.data))
    }
}