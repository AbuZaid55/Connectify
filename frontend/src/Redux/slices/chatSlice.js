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
        openSingleChat(state, action) {
            state.openSingleChat = action.payload
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
            if (state.openSingleChat._id === chatId) {
                state.openSingleChat.blockList.map((userID, i) => {
                    if (userID == userId) {
                        state.openSingleChat.blockList.splice(i, 1)
                    }
                })
            }
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.blockList.map((userID, i) => {
                        if (userID == userId) {
                            chat.blockList.splice(i, 1)
                        }
                    })
                }
            })
            return state
        },
        clearAllChats(state, action) {
            const { chatId, userId } = action.payload
            state.openSingleChat.massage.map((massage) => {
                if (!massage.isHidden.includes(userId)) {
                    massage.isHidden.push(userId)
                }
            })
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.massage.map((massage) => {
                        if (!massage.isHidden.includes(userId)) {
                            massage.isHidden.push(userId)
                        }
                    })
                }
            })
            return state
        },
        deleteChat(state, action) {
            const { chatId, userId } = action.payload
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.massage.map((massage) => {
                        if (!massage.isHidden.includes(userId)) {
                            massage.isHidden.push(userId)
                        }
                    })
                    chat.isHidden.push(userId)
                }
            })
            state.openSingleChat = ''
            return state
        },
        setMassage(state, action) {
            const chatId = action.payload.chatId
            const newMassage = action.payload.newMassage
            let chatIndex=0
            state.singleChat.map((chat,i) => {
                if (chat._id === chatId) {
                    chatIndex=i
                    chat.massage.push(newMassage)
                    if (state.openSingleChat._id === chatId) {
                        state.openSingleChat.massage.push(newMassage)
                    } else {
                        chat.notReadMassage += 1
                    }
                }
            })
            const currentChat = state.singleChat[chatIndex]
            for(let i=chatIndex;i>0;i--){
                state.singleChat[i]=state.singleChat[i-1]
            }
            state.singleChat[0]=currentChat
            return state
        },
        setChatNMassageIO(state, action) {
            const chat = action.payload
            let chatIndex=0
            state.singleChat.map((s_chat,i) => {
                if (s_chat._id === chat._id) {
                    chatIndex=i
                    s_chat.isHidden = []
                    s_chat.massage.push(chat.massage[0])
                    if (state.openSingleChat._id === chat._id) {
                        state.openSingleChat.massage.push(chat.massage[0])
                    } else {
                        s_chat.notReadMassage += 1
                    }
                }
            })
            const currentChat = state.singleChat[chatIndex]
            for(let i=chatIndex;i>0;i--){
                state.singleChat[i]=state.singleChat[i-1]
            }
            state.singleChat[0]=currentChat
            return state
        },
        deletemassage(state, action) {
            const { chatId, userId, massagesId } = action.payload
            state.openSingleChat.massage.map((massage) => {
                if (massagesId.includes(massage._id)) {
                    massage.isHidden.push(userId)
                }
            })
            state.singleChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.massage.map((massage) => {
                        if (massagesId.includes(massage._id)) {
                            massage.isHidden.push(userId)
                        }
                    })
                }
            })
            return state
        },


        //Group
        setGroupChat(state, action) {
            state.groupChat = action.payload
            return state
        },
        setNewGroup(state, action) {
            state.groupChat.push(action.payload)
            return state
        },
        openGroupChat(state, action) {
            state.openGroupChat = action.payload
            return state
        },
        setGroupMassage(state, action) {
            const chatId = action.payload.chatId
            const newMassage = action.payload.newMassage
            let chatIndex=0;
            state.groupChat.map((chat,i) => {
                if (chat._id === chatId) {
                    chatIndex=i
                    chat.massage.push(newMassage)
                    if (state.openGroupChat._id === chatId) {
                        state.openGroupChat.massage.push(newMassage)
                    } else {
                        chat.notReadMassage += 1
                    }
                }
            })
            const currentChat = state.groupChat[chatIndex]
            for(let i=chatIndex;i>0;i--){
                state.groupChat[i]=state.groupChat[i-1]
            }
            state.groupChat[0]=currentChat
            return state
        },
        setgroupChatNMassageIO(state, action) {
            const { chatId, newMassage } = action.payload
            let chatIndex=0
            state.groupChat.map((chat,i) => {
                if (chat._id === chatId) {
                    chatIndex=i
                    chat.massage.push(newMassage)
                    if (state.openGroupChat._id === chatId) {
                        state.openGroupChat.massage.push(newMassage)
                    } else {
                        chat.notReadMassage += 1
                    }
                }
            })
            const currentChat = state.groupChat[chatIndex]
            for(let i=chatIndex;i>0;i--){
                state.groupChat[i]=state.groupChat[i-1]
            }
            state.groupChat[0]=currentChat
            return state
        },
        setNotReadMassage_Group(state, action) {
            const chatId = action.payload.chatId
            state.groupChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.notReadMassage = 0
                }
            })
            return state
        },
        deleteGroupMassage(state, action) {
            const { chatId, userId, massagesId } = action.payload
            state.openGroupChat.massage.map((massage) => {
                if (massagesId.includes(massage._id)) {
                    massage.isHidden.push(userId)
                }
            })
            state.groupChat.map((group) => {
                if (group._id === chatId) {
                    group.massage.map((massage) => {
                        if (massagesId.includes(massage._id)) {
                            massage.isHidden.push(userId)
                        }
                    })
                }
            })
            return state
        },
        clearAllChats_Group(state, action) {
            const { chatId, userId } = action.payload
            state.openGroupChat.massage.map((massage) => {
                if (!massage.isHidden.includes(userId)) {
                    massage.isHidden.push(userId)
                }
            })
            state.groupChat.map((chat) => {
                if (chat._id === chatId) {
                    chat.massage.map((massage) => {
                        if (!massage.isHidden.includes(userId)) {
                            massage.isHidden.push(userId)
                        }
                    })
                }
            })
            return state
        },
        deleteGroup(state, action) {
            const { chatId } = action.payload
            if (state.openGroupChat._id === chatId) {
                state.openGroupChat = ''
            }
            state.groupChat = state.groupChat.filter((group) => group._id !== chatId)
            return state
        },
        leftUser(state, action) {
            const { chatId, userId } = action.payload
            if (state.openGroupChat._id === chatId) {
                state.openGroupChat.blockList.push(userId)
            }
            state.groupChat.map((group) => {
                if (group._id === chatId) {
                    group.blockList.push(userId)
                }
            })
            return state
        },
        addInGroup(state, action) {
            const { chat, userId } = action.payload
            let find = false
            state.groupChat.map((group) => {
                if (group._id === chat._id) {
                    find = true
                    group.blockList = group.blockList.filter((_id) => _id != userId)
                }
                if (state.openGroupChat._id === chat._id) {
                    state.openGroupChat.blockList = state.openGroupChat.blockList.filter((_id) => _id != userId)
                }
            })
            if (find === false) {
                chat.massage = []
                state.groupChat.push(chat)
            }
            return state
        },
        editgroup(state, action) {
            const { chatId, chatName, description } = action.payload
            if (state.openGroupChat._id === chatId) {
                state.openGroupChat.chatName = chatName
                state.openGroupChat.description = description
            }
            state.groupChat.map((group) => {
                if (group._id === chatId) {
                    group.chatName = chatName
                    group.description = description
                }
            })
            return state
        },
        uploadPic(state,action){
            const {chatId,secure_url}=action.payload
            if(state.openGroupChat._id===chatId){
                state.openGroupChat.profile.secure=secure_url
            }
            state.groupChat.map((group)=>{
                if(group._id===chatId){
                    group.profile.secure_url=secure_url
                }
            })
            return state
        }
    }
})

export default chatSlice;
export const { setSearchUser, setSingleChat, setGroupChat, openSingleChat, openGroupChat, setNotReadMassage_Chat, blockuser, unblockUser, clearAllChats, deleteChat, setMassage, setChatNMassageIO, deletemassage, setNewGroup, setGroupMassage, setgroupChatNMassageIO, setNotReadMassage_Group, deleteGroupMassage, clearAllChats_Group, deleteGroup, leftUser, addInGroup ,editgroup,uploadPic} = chatSlice.actions
