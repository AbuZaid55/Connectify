require('dotenv').config()
const express = require('express')
const db_Connect = require('./db/db_connection.js')
const cloudinary = require('cloudinary')
const cookie = require('cookie-parser')
const cors = require('cors')
const {Redis} = require('ioredis')
const app = express()

const PORT = process.env.PORT
const HOSTNAME = process.env.HOSTNAME

db_Connect()

app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:process.env.FRONTEND_URL, 
    credentials:true
}))
app.use(require('./routes/userRouter.js'))
app.use('/chat',require('./routes/chatRouter.js'))
app.use('/group',require('./routes/groupRouter.js'))
app.use('/massage',require('./routes/massageRouter.js'))
app.use('/groupmassage',require('./routes/groupMassageRouter.js'))

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
});

const pub = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})
const sub = new Redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
})

const server = app.listen(PORT,HOSTNAME,()=>{
    console.log(`App is listening on port no ${PORT}`)
})


const io = require('socket.io')(server,{  
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL
    }
})

sub.subscribe('newMessage')
sub.on('message',(channal,obj)=>{
    if(channal==="newMessage"){
        const {newMassage,chat,user} = JSON.parse(obj)
        user.loggedIn = []
        chat.chatName = user.name 
        chat.profile.secure_url = user.profile.secure_url 
        chat.massage = [newMassage] 
        chat.joinChat.map((object)=>{
            if(!chat.blockList.includes(object._id) && user._id!==object._id){ 
                io.in(object._id).emit('massageRecieved',chat)   
            }
        })
    }
})

io.on('connection',(socket)=>{ 
    socket.on('setup',(userId)=>{ 
        socket.join(userId)
        console.log("New user join ", userId)
    })
    socket.on('newMassage',async({newMassage,chat,user})=>{
        const obj = {newMassage,chat,user}
        await pub.publish("newMessage",JSON.stringify(obj))
    })

    socket.on('typing',({chat,userId})=>{
        chat.joinChat.map((object)=>{
            if(!chat.blockList.includes(object._id) && userId!==object._id){
                socket.in(object._id).emit('typing',chat._id)   
            }
        })
    })
    socket.on('stopTyping',({chat,userId})=>{
        chat.joinChat.map((object)=>{
            if(!chat.blockList.includes(object._id) && userId!==object._id){
                socket.in(object._id).emit('stopTyping',chat._id)   
            }
        })
    })

    socket.on('newGroupMassage',({newMassage,chat,userId})=>{
        chat.joinChat.map((object)=>{
            if(!chat.blockList.includes(object._id) && userId!==object._id){ 
                socket.in(object._id).emit('groupMassageRecieved',{chatId:chat._id,newMassage:newMassage})   
            }
        })
    })
  
    socket.on('removeGroupUser' ,({chatId,userId})=>{
        socket.in(userId).emit('removeMeGroup',chatId)
    })
    socket.on('addInGroup',({chat,usersId})=>{
        usersId.map((_id)=>{
            socket.in(_id).emit('addinGroup',chat)
        })
    })
})