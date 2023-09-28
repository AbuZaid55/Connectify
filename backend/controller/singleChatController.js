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
    const chat = await singleChatModel.find({joinChat:userId}).populate('joinChat','name')
    
    res.status(200).send(chat)
}

module.exports = {
    createChat,
    getChat,
}