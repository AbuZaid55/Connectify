import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice.js'
import chatSlice from '../slices/chatSlice.js'

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        chat:chatSlice.reducer
    },
    devTools:process.env.NODE_ENV !== "production",
})

export default store;