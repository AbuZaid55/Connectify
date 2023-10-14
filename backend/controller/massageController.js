const massageModel = require('../models/massageModel.js')
const singleChatModel = require('../models/chatModel.js')
const {sendError,sendSuccess} = require('../utils/sendResponse.js')

const createMassage = async(req,res)=>{
    const {senderId,content,chatId}=req.body 
    const hiddenUser = []
    if(!senderId || !content || !chatId){
        return sendError(res,"massage not created!")
    }
    try {
        const result = await massageModel({senderId,content,chatId,readBy:senderId,isHidden:hiddenUser})
        const chat = await singleChatModel.findById(chatId)
        chat.blockList.map((item)=>{
            hiddenUser.push(item.userId)
        })
        chat.lastMassage=content
        chat.massage.push(result._id)
        await chat.save()
        await result.save()
        sendSuccess(res,{massage:'Massage created'})
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}

module.exports = {
    createMassage,
}