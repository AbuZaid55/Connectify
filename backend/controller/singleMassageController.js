const massageModel = require('../models/massageModel.js')
const singleChatModel = require('../models/singleChatModel.js')

const createMassage = async(req,res)=>{
    const {senderId,content,chatId,isHidden}=req.body 
    const result = await massageModel({senderId,content,chatId,readBy:senderId,isHidden})
    const chat = await singleChatModel.findById(chatId)
    chat.massage.push(result._id)
    await chat.save()
    await result.save()
    res.send("Massage Created")
}

module.exports = {
    createMassage,
}