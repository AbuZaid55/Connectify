require('dotenv').config()
const express = require('express')
const db_Connect = require('./db/db_connection.js')
const cloudinary = require('cloudinary')
const cookie = require('cookie-parser')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT

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

const server = app.listen(PORT,()=>{
    console.log(`App is listening on port no ${PORT}`)
})


const io = require('socket.io')(server,{  
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL
    }
})

io.on('connection',(socket)=>{ 
    socket.on('setup',(userId)=>{ 
        socket.join(userId)
        console.log("New user join ", userId)
    })
    socket.on('newMassage',({newMassage,chat,user})=>{
        user.loggedIn = []
        chat.chatName = user.name 
        chat.profile = user.profile.secure_url 
        chat.massage = [newMassage] 
        chat.joinChat.map((object)=>{
            if(!chat.blockList.includes(object._id) && user._id!==object._id){ 
                socket.in(object._id).emit('massageRecieved',chat)   
            }
        })
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
})