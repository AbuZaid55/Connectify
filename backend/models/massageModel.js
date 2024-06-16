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
    readBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    isHidden:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('massage',massageSchema)

