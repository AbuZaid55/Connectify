const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
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
    joinChat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    massage:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'massage'
    }],
    notReadMassage:{
        type:Number,
        default:0,
        required:true
    },
    blockList: [],
    isHidden:[]
},{timestamps:true},{_id:false})

module.exports = mongoose.model('singleChat',chatSchema)

