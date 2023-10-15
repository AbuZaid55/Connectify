import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:'Chat',
    initialState:{searchUsers:[],singleChat:[],groupChat:[],openSingleChat:'',openGroupChat:''},
    reducers:{
        setSearchUser(state,action){
            state.searchUsers=action.payload
            return state
        },
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
        },
        setNotReadMassage_Chat(state,action){
            const chatId = action.payload.chatId
            const type = (action.payload && action.payload.type )|| ''
            state.singleChat.map((chat)=>{
               if(chat._id===chatId){
                if(type==='zero'){
                    chat.notReadMassage=0
                }else{
                    chat.notReadMassage = chat.notReadMassage+1
                }
               }
            })
            return state
        },
        blockuser(state,action){
            const userId = action.payload.userId 
            const chatId = action.payload.chatId 
            state.openSingleChat.blockList.push(userId)
            state.singleChat.map((chat)=>{
                if(chat._id===chatId){
                    chat.blockList.push(userId)
                }
            })
            return state
        },
        unblockUser(state,action){
            console.log("run11")
            const userId = action.payload.userId 
            const chatId = action.payload.chatId 
            state.openSingleChat.blockList.map((object)=>{
                if(object.userId!==userId){
                    return object
                }
            })
            return state
            // state.singleChat.map((chat)=>{
            //     if(chat._id===chatId){
            //         chat.blockList.map((object)=>{
            //             if(object.userId!==userId){
            //                 return object
            //             }
            //         })
            //     }
            // })
        },
    }
})

export default chatSlice;
export const {setSearchUser,setSingleChat,setGroupChat,openSingleChat,openGroupChat,setNotReadMassage_Chat,blockuser,unblockUser} = chatSlice.actions
