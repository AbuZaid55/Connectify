import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'Chat',
    initialState: { searchUsers: [], singleChat: [], groupChat: [], openSingleChat: '', openGroupChat: '' },
    reducers: {
        setSearchUser(state, action) {
            state.searchUsers = action.payload
            return state
        },
        setSingleChat(state, action) {
            state.singleChat = action.payload
            return state
        },
        setGroupChat(state, action) {
            state.groupChat = action.payload
            return state
        },
        openSingleChat(state, action) {
            state.openSingleChat = action.payload
            return state
        },
        openGroupChat(state, action) {
            state.openGroupChat = action.payload
            return state
        },
        setNotReadMassage_Chat(state, action) {
            const chatId = action.payload.chatId
            const type = (action.payload && action.payload.type) || ''
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    if (type === 'zero') {
                        chat.notReadMassage = 0
                    } else {
                        chat.notReadMassage = chat.notReadMassage + 1
                    }
                }
            })
            return state
        },
        blockuser(state, action) {
            const userId = action.payload.userId
            const chatId = action.payload.chatId
            state.openSingleChat.blockList.push(userId)
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.blockList.push(userId)
                }
            })
            return state
        },
        unblockUser(state, action) {
            const userId = action.payload.userId
            const chatId = action.payload.chatId
            state.openSingleChat.blockList.map((userID, i) => {
                if (userID == userId) {
                    state.openSingleChat.blockList.splice(i, 1)
                }
            })
            state.singleChat.map((chat)=>{
                if(chat._id===chatId){
                    chat.blockList.map((userID,i)=>{
                        if (userID == userId) {
                            chat.blockList.splice(i, 1)
                        }
                    })
                }
            })
            return state
        },
        clearAllChats(state,action){
            const {chatId,userId}=action.payload 
            state.openSingleChat.massage.map((massage)=>{
                if(!massage.isHidden.includes(userId)){
                    massage.isHidden.push(userId)
                }
            })
            state.singleChat.map((chat)=>{
                if(chat._id===chatId){
                    chat.massage.map((massage)=>{
                        if(!massage.isHidden.includes(userId)){
                            massage.isHidden.push(userId)
                        }
                    })
                }
            })
            return state
        },
        deleteChat(state,action){
            const {chatId,userId}=action.payload 
            state.singleChat.map((chat)=>{
                if(chat._id===chatId){
                    chat.massage.map((massage)=>{
                        if(!massage.isHidden.includes(userId)){
                            massage.isHidden.push(userId)
                        }
                    })
                    chat.isHidden.push(userId)
                }
            })
            state.openSingleChat=''
            return state
        },
        setMassage(state,action){
            const userId = action.payload.userId
            const chatId = action.payload.chatId
            state.singleChat.map((chat)=>{
                if(chat._id===chatId){
                    if(!chat.blockList.includes(userId)){
                        chat.massage.push(action.payload)
                        if(state.openSingleChat._id===chatId){
                            state.openSingleChat.massage.push(action.payload)
                        }else{
                            chat.notReadMassage +=1
                        }
                        return state
                    }
                }
            })
        }
    }
})

export default chatSlice;
export const { setSearchUser, setSingleChat, setGroupChat, openSingleChat, openGroupChat, setNotReadMassage_Chat, blockuser, unblockUser,clearAllChats ,deleteChat,setMassage} = chatSlice.actions
