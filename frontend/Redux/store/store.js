import {configureStore} from '@reduxjs/toolkit'
import userSlice from '../slices/userSlice'

const store = configureStore({
    reducer:{
        user:userSlice.reducer
    },
    devTools:process.env.NODE_ENV !== "production",
})

export default store;