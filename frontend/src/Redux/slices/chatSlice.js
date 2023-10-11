import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:'Chat',
    initialState:{singleChat:[],groupChat:[],openSingleChat:'',openGroupChat:''},
    reducers:{
        setSingleChat(state,action){
            state.singleChat=action.payload
            return state
        },
        setGroupChat(state,action){
            state.groupChat=action.payload
            return state
        },
        openSingleChat(state,action){
            state.openSingleChat=action.payload
            return state
        },
        openGroupChat(state,action){
            state.openGroupChat=action.payload
            return state
        }
    }
})

export default chatSlice;
export const {setSingleChat,setGroupChat,openSingleChat,openGroupChat} = chatSlice.actions
