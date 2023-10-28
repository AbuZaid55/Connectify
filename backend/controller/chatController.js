const chatModel = require('../models/chatModel.js')
const userModel = require('../models/userModel.js')
const massageModel = require('../models/massageModel.js')
const { sendSuccess, sendError } = require('../utils/sendResponse.js')

const searchUsers = async (req, res) => {
    const { search, userId } = req.body
    try {
        const users = await userModel.find({
            $and: [
                { _id: { $ne: userId } },
                { $or: [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: 'i' } }] }
            ]
        }).select('name email profile _id bio')
        sendSuccess(res, { users: users })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const createChat = async (req, res) => {
    const { myId, otherUserId, type } = req.body
    try {
        if (type === 'Chat') {
            const isExits = await chatModel.findOne({
                $and: [
                    { joinChat: { $in: myId } },
                    { joinChat: { $in: otherUserId } }
                ]
            })
            if (isExits) {
                if (isExits.isHidden.includes(myId)) {
                    isExits.isHidden.map((userid,i)=>{
                        if(userid===myId){
                            isExits.isHidden.splice(i,1)
                        }
                    })
                    await isExits.save()
                }
                return sendSuccess(res, { massage: 'Chat Created', chatId: isExits._id })
            }
        }
        const newChat = await chatModel({ joinChat: [myId, otherUserId], createdBy: myId, isHidden: [otherUserId] }).save()
        sendSuccess(res, { massage: 'Chat Created', chatId: newChat._id })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const getSingleChat = async (req, res) => {
    const { userId } = req.body
    try {
        console.log("AAAA") 
        const chat = await chatModel.find({ joinChat: userId }).populate({ path: 'joinChat', select: 'name profile bio' }).populate({
            path: 'massage',
            match: { isHidden: { $nin: userId } }
        })
    
        const chatResult = chat.filter((s_chat) => {
            let notReadMassage = 0
            s_chat.massage.map((massage) => { 
                if (!massage.readBy.includes(userId)) {
                    notReadMassage = notReadMassage + 1
                }
            })
            s_chat.joinChat.map((user)=>{
                if(user._id!=userId){
                    s_chat.profile=user.profile.secure_url
                    s_chat.chatName=user.name
                }
            })
            s_chat.notReadMassage = notReadMassage
            return s_chat
    
        })
        res.status(200).send(chatResult)
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}
const blockChat = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials ")
    }
    try {
        const chat = await chatModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Invalid chat Id")
        }
        chat.blockList.push(userId )
        await chat.save()
        sendSuccess(res, { massage: "user block successfully" })
    }
    catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const unblock = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials !")
    }
    try {
        const chat = await chatModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Chat not found!")
        }
        const newBlockList = chat.blockList.filter((userID) => {
            if (userID != userId) {
                return userID
            }
        })
        chat.blockList = newBlockList
        await chat.save()
        sendSuccess(res, { massage: "User unblock successfully" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }

}
const updateReadMassge = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials ")
    }
    try {
        const chat = await chatModel.findById(chatId).populate({
            path: 'massage',
            match: {
                $and: [
                    { isHidden: { $nin: userId } },
                    { readBy: { $nin: userId } }
                ]
            }
        })
        if (!chat) {
            return sendError(res, "Invalid chat id")
        }
        chat.massage.map(async (m) => {
            const result = await massageModel.findById(m._id)
            result.readBy.push(userId)
            await result.save()
        })
        sendSuccess(res, { massage: "updated readby massage" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const clearAllChats = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials!")
    }
    try {
        const chat = await chatModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Invalid chat id!")
        }
        chat.massage.map(async (massage) => {
            const dbMassage = await massageModel.findById(massage._id)
            if (!dbMassage.isHidden.includes(userId)) {
                dbMassage.isHidden.push(userId)
            }
            await dbMassage.save()
        })
        sendSuccess(res, { massage: "Clear all chats successfully" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const deleteChat = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid chat id!")
    }
    try {
        const chat = await chatModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Invalid chat id!")
        }
        chat.massage.map(async (massage) => {
            const dbMassage = await massageModel.findById(massage._id)
            if (!dbMassage.isHidden.includes(userId)) {
                dbMassage.isHidden.push(userId)
            }
            await dbMassage.save()
        })
        chat.isHidden.push(userId)
        await chat.save()
        sendSuccess(res, { massage: 'Delete chat successfully' })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}

module.exports = {
    createChat,
    getSingleChat,
    blockChat,
    searchUsers,
    unblock,
    updateReadMassge,
    clearAllChats,
    deleteChat,
}