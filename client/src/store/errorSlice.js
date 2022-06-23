import { createSlice } from "@reduxjs/toolkit"

export const errorSlice = createSlice({
    name: "error",
    initialState: {
        type: "",
        message: ""
    },
    reducers: {
        setError(state, action) {
            state.type = action.payload.type
            state.message = action.payload.message
        },

        removeError(state) {
            state.type = ""
            state.message = ""
        }
    }

})

export default errorSlice.reducer
export const {setError, removeError} = errorSlice.actions