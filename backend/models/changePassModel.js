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
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

changePassSchema.index({ createdAt: 1 }, { expires: Number(process.env.EXPIRE_TOKEN_TIME ) })


module.exports = mongoose.model("changePass",changePassSchema)