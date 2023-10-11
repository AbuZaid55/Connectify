const chatModel = require('../models/chatModel.js')

const createChat = async(req,res)=>{
    const data =req.body
    await chatModel({joinChat:data}).save()
    res.send('created single chat')
}

const getSingleChat = async(req,res)=>{
    const {userId}= req.body
    const chat = await chatModel.find({joinChat:userId}).populate({path:'joinChat',match:{_id:{$ne:userId}},select:'name profile bio'}).populate({
        path:'massage',
        match:{isHidden:{$nin:userId}}
    })

   const chatResult = chat.map((s_chat)=>{
    let notReadMassage = 0
    s_chat.blockList.map((item)=>{
        if(item.userId==userId){
           s_chat.updatedAt=item.time
        }
        return item
    })
    s_chat.massage.map((massage)=>{
        if(!massage.readBy.includes(userId)){
            notReadMassage=notReadMassage+1
        }
    })
    s_chat.chatName=s_chat.joinChat[0].name
    s_chat.notReadMassage=notReadMassage
    s_chat.profile=s_chat.joinChat[0].profile.secure_url
    s_chat.admin=undefined
    return s_chat
   })
    res.status(200).send(chatResult)
}


const blockChat = async(req,res)=>{
    const {userId,chatId}=req.body
    const chat = await chatModel.findById(chatId)
    chat.blockList.push({userId})
    await chat.save()
    res.send("single user Blocked!")
}

module.exports = {
    createChat,
    getSingleChat,
    blockChat,
}