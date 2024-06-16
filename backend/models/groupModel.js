const mongoose = require('mongoose')
const groupSchema = mongoose.Schema({
    chatName:{
        type:String,
        default:''
    },
    profile:{
        public_id:{
            type:String,
            default:'',
        },
        secure_url:{
            type:String,
            default:'',
        },
    },
    admin:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    description:{
        type:String,
    },
    joinChat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    massage:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'groupMassage'
    }],
    notReadMassage:{
        type:Number,
        default:0,
        required:true
    },
    blockList: [],
},{timestamps:true},{_id:false})

module.exports = mongoose.model('groupChat',groupSchema)

