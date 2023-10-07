import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:'Chat',
    initialState:{singleChat:'',groupChat:''},
    reducers:{
        setSingleChat(state,action){
            state.singleChat=action.payload
            return state
        },
        setGroupChat(state,action){
            state.groupChat=action.payload
            return state
        }
    }
})

export default chatSlice;
export const {setSingleChat,setGroupChat} = chatSlice.actions
