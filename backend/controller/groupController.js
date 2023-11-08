const { sendError, sendSuccess } = require('../utils/sendResponse.js')
const groupModel = require('../models/groupModel.js')

const createGroup = async (req, res) => {
    const { chatName, description, users, admin } = req.body
    console.log(chatName, description, users, admin)
    if (!admin) {
        return sendError(res, "Invalid User!")
    }
    if (users.length <= 1) {
        return sendError(res, "Select User")
    }
    if (!chatName) {
        return sendError(res, "Please Enter Chat Name")
    }
    try {
        const chat = await groupModel({ chatName, description, joinChat: users, admin: [admin] })
        await chat.save()
        console.log(chat)
        sendSuccess(res, { massage: 'group Created', group: chat })
    } catch (error) {
        console.log(error)
        sendError(res, "Something went wrong!")
    }
}

const getGroupChat = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return sendError(res, "Invalid User") 
    }

    try {
        const chat = await groupModel.find({ joinChat: userId }).populate({ path: 'joinChat', select: 'name profile.secure_url bio' }).populate({
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
            s_chat.notReadMassage = notReadMassage
            return s_chat
        })
        res.status(200).send(chatResult)
    } catch (error) {
        console.log(error)
        sendError(res, "Something went wrong!")
    }
}

module.exports = {
    createGroup,
    getGroupChat,
}