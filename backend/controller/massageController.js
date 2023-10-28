const massageModel = require('../models/massageModel.js')
const chatModel = require('../models/chatModel.js')
const {sendError,sendSuccess} = require('../utils/sendResponse.js')

const createMassage = async(req,res)=>{
    const {senderId,content,chatId}=req.body 
    if(!senderId || !content || !chatId){
        return sendError(res,"massage not created!")
    }
    try {
        const chat = await chatModel.findById(chatId).populate({ path: 'joinChat', select: 'name profile bio' })
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
const deleteMassage = async(req,res)=>{
    const {chatId,massagesId,userId}=req.body 
    console.log(chatId)
    if(!userId){
        return sendError(res,"User id not found!")
    }
    if(!chatId){
        return sendError(res,"Chat id not found!")
    }
    if(massagesId.length==0){
        return sendError(res,"Massages id not found!")
    }
    try {
        const chat = await chatModel.findById(chatId).populate({
            path:'massage',
            match: { _id: { $in: massagesId } }
        })
        if(!chat){
            return sendError(res,"Invalid chat id")
        }
        let deleteMassage = []
        chat.massage.map(async(massage)=>{
            const dbMassage = await massageModel.findById(massage._id)
            if(dbMassage.isHidden.length==chat.joinChat.length-1){
                await massageModel.deleteOne({_id:massage._id})
                deleteMassage.push(dbMassage._id) 
            }else{
                if(!dbMassage.isHidden.includes(userId)){ 
                    dbMassage.isHidden.push(userId)
                    await dbMassage.save()
                }
            }
        })
        const ch = await chatModel.findById(chatId)
        ch.massage = ch.massage.filter((_id)=>{
            if(!deleteMassage.includes(_id)){
                return _id
            }
        })
        await ch.save()
        sendSuccess(res,{massage:"Massages delete successfully"})
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}

module.exports = {
    createMassage,
    deleteMassage
}