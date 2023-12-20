const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const changePassSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true,
    },
},{timestamps:true})

changePassSchema.index({createdAt:1}, { expireAfterSeconds: Number(process.env.EXPIRE_TOKEN_TIME ) }) 


module.exports = mongoose.model("changePass",changePassSchema) 