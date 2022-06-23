import { configureStore, combineReducers } from "@reduxjs/toolkit"
import errorSlice  from "./errorSlice"
import userSlice from "./userSlice"

const rootReducer = combineReducers({
    user: userSlice,
    error: errorSlice,
})


export const store = configureStore({
    reducer: rootReducer
})
