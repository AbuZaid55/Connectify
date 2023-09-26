const mongoose = require('mongoose')
const URL = process.env.DB_URL
const db_Connect = () =>{
    mongoose.connect(URL).then(()=>{
        console.log('DB connect successfully')
    }).catch(()=>{
        console.log('No connection')
    })
}

module.exports = db_Connect;