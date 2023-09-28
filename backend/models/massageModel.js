const mongoose = require('mongoose')
const massageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    readBy:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    isHidden:[
        {
            type:mongoose.Schema.Types.ObjectId,
        }
    ]
})

module.exports = mongoose.model('massage',massageSchema)