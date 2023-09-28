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
app.use('/singleChat',require('./routes/singleChatRouter.js'))
app.use('/singlemassage',require('./routes/singleMassageRouter.js'))

app.listen(PORT,()=>{
    console.log(`App is listening on port no ${PORT}`)
})