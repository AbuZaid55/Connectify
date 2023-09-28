const massageModel = require('../models/massageModel.js')
const singleChatModel = require('../models/chatModel.js')

const createMassage = async(req,res)=>{
    const {senderId,content,chatId,isHidden}=req.body 
    const hiddenUser = []
    isHidden.map((item)=>{
        hiddenUser.push(item.userId)
    })
    const result = await massageModel({senderId,content,chatId,readBy:senderId,isHidden:hiddenUser})
    const chat = await singleChatModel.findById(chatId)
    chat.lastMassage=content
    chat.massage.push(result._id)
    await chat.save()
    await result.save()
    res.send("Massage Created")
}

module.exports = {
    createMassage,
}