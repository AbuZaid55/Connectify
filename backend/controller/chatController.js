const chatModel = require('../models/chatModel.js')
const userModel = require('../models/userModel.js')
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
    const { data,createdBy, type } = req.body
    try {
        if (type === 'Chat') {
            const isExits = await chatModel.findOne({
                $and: [
                    { joinChat: { $in: data[0] } },
                    { joinChat: { $in: data[1] } }
                ]
            })
            if (isExits) {
                if(isExits.massage.length==0){
                    isExits.createdBy=createdBy
                    await isExits.save()
                }
                return sendSuccess(res, { massage: 'Chat Created', chatId: isExits._id })
            }
        }
        const newChat = await chatModel({ joinChat: data,createdBy:createdBy }).save()
        sendSuccess(res, { massage: 'Chat Created', chatId: newChat._id })
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}
const getSingleChat = async (req, res) => {
    const { userId } = req.body
    const chat = await chatModel.find({ joinChat: userId }).populate({ path: 'joinChat', match: { _id: { $ne: userId } }, select: 'name profile bio' }).populate({
        path: 'massage',
        match: { isHidden: { $nin: userId } }
    })

    const chatResult = chat.filter((s_chat) => {
        let notReadMassage = 0
        if(s_chat.massage.length==0 && s_chat.createdBy!==userId){
        }else{
            // s_chat.blockList.map((item) => {
            //     if (item.userId == userId) {
            //         s_chat.updatedAt = item.time
            //     }
            //     return item
            // })
            s_chat.massage.map((massage) => {
                if (!massage.readBy.includes(userId)) {
                    notReadMassage = notReadMassage + 1
                }
            })
            s_chat.chatName = s_chat.joinChat[0].name
            s_chat.notReadMassage = notReadMassage
            s_chat.profile = s_chat.joinChat[0].profile.secure_url
            s_chat.admin = undefined
            return s_chat
        }
        
    })
    res.status(200).send(chatResult)
}
const blockChat = async (req, res) => {
    const { userId, chatId } = req.body
    const chat = await chatModel.findById(chatId)
    chat.blockList.push({ userId })
    await chat.save()
    res.send("single user Blocked!")
}
const unblock = async(req,res)=>{
    const {userId,chatId}=req.body
    if(!userId || !chatId){
        return sendError(res,"Invalid credentials!")
    }
    try {
        const chat = await chatModel.findById(chatId)
        if(!chat){
            return sendError(res,"Chat not found!")
        }
        const newBlockList = chat.blockList.filter((object)=>{
            if(object.userId!=userId){
                return object
            }
        })
        console.log(newBlockList)
        console.log("BBB")
    } catch (error) {
        console.log(error)
        sendError(res,"Something went wrong!") 
    }

}

module.exports = {
    createChat,
    getSingleChat,
    blockChat,
    searchUsers,
    unblock,
}