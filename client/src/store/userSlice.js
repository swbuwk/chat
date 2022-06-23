import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        name: "",
        email: "",
        id: "",
        isActivated: false,
    },
    reducers: {
        setUserData(state, actions) {
            const userData = actions.payload.user
            state.email = userData.email
            state.name = userData.name
            state.id = userData.id
            state.isActivated = userData.isActivated
            state.isAuth = true
        },

        eraseUserData(state) {
            state.isAuth = false
            state.name = ""
            state.email = ""
            state.id = ""
            state.isActivated = false
        },

        addRoom(state, actions) {
            state.rooms.push(actions.payload)
        }
    }
})

export default userSlice.reducer
export const {setUserData, eraseUserData, addRoom} = userSlice.actions