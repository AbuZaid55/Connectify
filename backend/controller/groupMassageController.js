const groupModel = require('../models/groupModel.js')
const groupMassageModel = require('../models/groupMassageModel.js')
const { sendError, sendSuccess } = require('../utils/sendResponse.js') 

const createMassage = async (req, res) => {
    const { senderId, content, chatId } = req.body
    if (!senderId || !content || !chatId) {
        return sendError(res, "massage not created!")
    }
    try {
        const chat = await groupModel.findById(chatId).populate({ path: 'joinChat', select: 'name profile bio' })
        if (!chat) {
            return sendError(res, "Invalid chat id!")
        }
        const result = await groupMassageModel({ senderId, content, chatId, readBy: senderId, isHidden: chat.blockList })
        chat.massage.push(result._id)
        await chat.save()
        await result.save()
        sendSuccess(res, { massage: 'Massage created', newMassage: result, chatId: chat._id })
    } catch (error) {
        console.log(error)
        sendError(res, "Something went wrong!")
    }
}
const deleteMassage = async (req, res) => {
    const { chatId, massagesId, userId } = req.body
    if (!userId) {
        return sendError(res, "User id not found!")
    }
    if (!chatId) {
        return sendError(res, "Chat id not found!")
    }
    if (massagesId.length == 0) {
        return sendError(res, "Massages id not found!")
    }
    try {
        const chat = await groupModel.findById(chatId).populate({
            path: 'massage',
            match: { _id: { $in: massagesId } }
        })
        if (!chat) {
            return sendError(res, "Invalid chat id")
        }
        chat.massage.map(async (massage) => {
            const dbMassage = await groupMassageModel.findById(massage._id)
            if (!dbMassage.isHidden.includes(userId)) {
                dbMassage.isHidden.push(userId)
                await dbMassage.save()
            }
        })
        sendSuccess(res, { massage: "Massages delete successfully" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}



module.exports = {
    createMassage,
    deleteMassage,
}