require('dotenv').config()
const express = require('express')
const db_Connect = require('./db/db_connection.js')
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
app.use('/massage',require('./routes/massageRouter.js'))

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
    console.log("Connected to socket.io")
    socket.on('setup',(userId)=>{ 
        socket.join(userId)
        console.log("New user join ", userId)
    })
    socket.on('newMassage',({newMassage,chat,user})=>{
        user.loggedIn = []
        chat.chatName = user.name 
        chat.profile = user.profile.secure_url 
        chat.massage = newMassage
        chat.joinChat.map((userId)=>{
            if(!chat.blockList.includes(userId)){
                socket.in(userId).emit('massageRecieved',chat) 
            }
        })
    })
})