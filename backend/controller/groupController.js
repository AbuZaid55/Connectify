const { sendError, sendSuccess } = require('../utils/sendResponse.js')
const groupModel = require('../models/groupModel.js')
const groupMassageModel = require('../models/groupMassageModel.js')
const cloudinary = require('cloudinary')
const fs = require('fs/promises')

const createGroup = async (req, res) => {
    const { chatName, description, users, admin } = req.body
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
        const chat = await groupModel({ chatName, description, joinChat: users, admin: [admin] }).populate({path:'joinChat',select:'name profile.seucre_url bio'})
        await chat.save()
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
        }).sort({ updatedAt: 'desc' })

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
const updateReadMassge = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials ")
    }
    try {
        const chat = await groupModel.findById(chatId).populate({
            path: 'massage',
            match: {
                $and: [
                    { isHidden: { $nin: userId } },
                    { readBy: { $nin: userId } }
                ]
            }
        })
        if (!chat) {
            return sendError(res, "Invalid chat id")
        }
        chat.massage.map(async (m) => {
            const result = await groupMassageModel.findById(m._id)
            result.readBy.push(userId)
            await result.save()
        })
        sendSuccess(res, { massage: "updated readby massage" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const clearAllChats = async (req, res) => {
    const { userId, chatId } = req.body
    if (!userId || !chatId) {
        return sendError(res, "Invalid credentials!")
    }
    try {
        const chat = await groupModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Invalid chat id!")
        }
        chat.massage.map(async (massage) => {
            const dbMassage = await groupMassageModel.findById(massage._id)
            if (!dbMassage.isHidden.includes(userId)) {
                dbMassage.isHidden.push(userId)
            }
            await dbMassage.save()
        })
        sendSuccess(res, { massage: "Clear all chats successfully" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const getSingleGroup = async (req, res) => {
    const { groupId, userId } = req.body
    if (!groupId || !userId) {
        return sendError(res, "Invalid details!")
    }
    try {
        const chat = await groupModel.findOne({ _id: groupId, joinChat: userId }).populate({ path: 'joinChat', select: 'name profile.secure_url bio' }).populate({ path: 'admin', select: ' name profile.secure_url bio' })
        if (!chat) {
            return sendError(res, "Chat not found!")
        }
        chat.profile.public_id = undefined
        sendSuccess(res, { data: chat })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const addUser = async (req, res) => {
    const { chatId, users } = req.body
    if (!chatId || users.length == 0) {
        return sendError(res, 'Please select user!')
    }
    try {
        const chat = await groupModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Chat not found!")
        }
        users.map((_id)=>{
            if(!chat.joinChat.includes(_id)){
                chat.joinChat.push(_id)
            }
        })
        chat.blockList = chat.blockList.filter((_id)=>!users.includes(_id))
        await chat.save()
        sendSuccess(res,{massage:"Users added successfully"})
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const addAdmin = async (req, res) => {
    const { chatId, users } = req.body
    if (!chatId || users.length == 0) {
        return sendError(res, 'Please select user!')
    }
    try {
        const chat = await groupModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Chat not found!")
        }
        chat.admin = chat.admin.concat(users)
        await chat.save()
        sendSuccess(res,{massage:"Users added successfully"})
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const removeAdmin = async(req,res)=>{
    const {chatId,myId,adminId}=req.body
    if(!chatId || !myId || !adminId){
        return sendError(res,"Invalid details")
    }
    try {
        const chat =  await groupModel.findById(chatId)
        if(!chat){
            return sendError(res,"Chat not found!")
        }
        if(!chat.admin.includes(myId)){
            return sendError(res,"You have no permission")
        }
        if(chat.admin.length<=1){
            return res.status(202).send({massage:'Please make admin to another'})
        }
        chat.admin = chat.admin.filter((_id)=>_id!=adminId)
        await chat.save()
        sendSuccess(res,{massage:"Admin removed successfully"})
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}
const removeUser = async(req,res)=>{
    const {chatId,userId}=req.body
    if(!chatId || !userId){
        return sendError(res,"Invalid details")
    }
    try {
        const chat = await groupModel.findById(chatId)
        if(!chat){
            return sendError(res,"Chat not found!")
        }
        chat.blockList.push(userId)
        await chat.save()
        sendSuccess(res,{massage:'User removed successfully'})
    } catch (error) {
        console.log(error)
        sendError(res,"Something went wrong!")
    }
}
const deleteGroup = async(req,res)=>{
    const {chatId,userId}=req.body 
    if(!chatId || !userId){
        return sendError(res,"Invlalid details!")
    }
    try {
      const chat = await groupModel.findById(chatId)  
      if(!chat){
        return sendError(res,"Chat not found!")
      }
      chat.blockList = chat.blockList.filter((_id)=>_id!=userId)
      chat.joinChat = chat.joinChat.filter((_id)=>_id!=userId)
      if(chat.joinChat.length==0){
        chat.massage.map(async(massageId)=>{
            await groupMassageModel.findByIdAndDelete(massageId)
        })
        await groupModel.findByIdAndDelete(chatId)
      }else{
        await chat.save()
      }
      sendSuccess(res,{massage:"Group delete successfully"})
    } catch (error) {
        sendError(res,"Something went wrong!")
    }
}
const editGroup = async(req,res)=>{
    const {chatId,chatName,description}=req.body
    if(!chatId){
        return sendError(res,"Chat id not found!")
    }
    if(!chatName){
        return sendError(res,"Enter Group Name")
    }
    try {
        const chat = await groupModel.findById(chatId)
        if(!chat){
            return sendError(res,"Invalid chat id")
        }
        chat.chatName =chatName
        chat.description=description
        await chat.save()
        sendSuccess(res,{massage:"Group edit successfully"})
    } catch (error) {
     sendError(res,"Something went wrong!")   
    }
}
const uploadprofile = async(req,res)=>{
    if (req.fileError) {
        return sendError(res, req.fileError)
    }
    const chatId = (req.body && req.body.chatId) ? req.body.chatId : ''
    const profile = (req.file && req.file.filename) ? req.file.filename : ''
    if (profile === '') {
        return sendError(res, "Please select profile pic!")
    }
    if (chatId === '') {
        return sendError(res, "Invalid User!")
    }
    try {
        const chat = await groupModel.findById(chatId)
        if (!chat) {
            return sendError(res, "Invalid Chat!")
        }
        if (chat.profile.public_id !== '') {
            await cloudinary.uploader.destroy(chat.profile.public_id)
        }
        const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'Connectify_Profile' })

        if (result) {
            chat.profile.public_id = result.public_id
            chat.profile.secure_url = result.secure_url
        }
        await chat.save()
        fs.rm(req.file.path)
        sendSuccess(res, {massage:"Profile upload successfully", secure_url:result.secure_url , chatId:chatId})
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
module.exports = {
    createGroup,
    getGroupChat,
    updateReadMassge,
    clearAllChats,
    getSingleGroup,
    addUser,
    addAdmin,
    removeAdmin,
    removeUser,
    deleteGroup,
    editGroup,
    uploadprofile
}