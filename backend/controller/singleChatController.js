const singleChatModel = require('../models/singleChatModel.js')
const {sendError,sendSuccess} = require('../utils/sendResponse.js')
const massageModel = require('../models/massageModel.js')

const createChat = async(req,res)=>{
    const data =req.body
    await singleChatModel({joinChat:data}).save()
    res.send('created single chat')
}

const getChat = async(req,res)=>{
    const {userId}= req.body
    const chat = await singleChatModel.find({joinChat:userId}).populate('joinChat','name').populate({
        path:'massage',
        match:{isHidden:{$nin:userId}}
    })

   const chatResult = chat.map((s_chat)=>{
    let notReadMass = 0
    s_chat.blockList.map((item)=>{
        if(item.userId==userId){
           s_chat.updatedAt=item.time
        }
        return item
    })
    s_chat.massage.map((massage)=>{
        if(!massage.readBy.includes(userId)){
            notReadMass=notReadMass+1
        }
    })
    console.log(notReadMass)
    return s_chat
   })
    
    res.status(200).send(chatResult)
}


const blockChat = async(req,res)=>{
    const {userId,chatId}=req.body
    const chat = await singleChatModel.findById(chatId)
    chat.blockList.push({userId})
    await chat.save()
    res.send("single user Blocked!")
}

module.exports = {
    createChat,
    getChat,
    blockChat,
}