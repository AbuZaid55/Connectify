const massageModel = require('../models/massageModel.js')
const singleChatModel = require('../models/chatModel.js')
const {sendError,sendSuccess} = require('../utils/sendResponse.js')

const createMassage = async(req,res)=>{
    const {senderId,content,chatId}=req.body 
    if(!senderId || !content || !chatId){
        return sendError(res,"massage not created!")
    }
    try {
        const chat = await singleChatModel.findById(chatId).populate({ path: 'joinChat', select: 'name profile bio' })
        if(!chat){
            return sendError(res,"Invalid chat id!")
        }
        chat.isHidden = chat.isHidden.filter((userId)=>{
            if(chat.blockList.includes(userId)){
                return userId
            }
        })
        const result = await massageModel({senderId,content,chatId,readBy:senderId,isHidden:chat.blockList})
        chat.massage.push(result._id)
        await chat.save()
        await result.save()

        
        sendSuccess(res,{massage:'Massage created',newMassage:result,chat:chat})
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}

module.exports = {
    createMassage,
}