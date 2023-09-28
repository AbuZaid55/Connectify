const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
    lastMassage:{
        type:String,
        default:'',
    },
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
        }
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    joinChat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }
    ],
    blockList: [
        {
            _id:false,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            time: {
                type: Date,
                default: Date.now(),
                required: true
            }
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
    }
},{timestamps:true},{_id:false})

module.exports = mongoose.model('singleChat',chatSchema)