import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

import userSlice from "./userSlice"

const rootReducer = combineReducers({
    user: userSlice
})


export const store = configureStore({
    reducer: rootReducer
})
