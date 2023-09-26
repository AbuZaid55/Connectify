require('dotenv').config()
const express = require('express')
const db_Connect = require('./db/db_connection.js')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT

db_Connect()

app.use(require('./routes/userRouter.js'))

app.listen(PORT,()=>{
    console.log(`App is listening on port no ${PORT}`)
})