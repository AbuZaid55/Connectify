const mongoose = require('mongoose')
const singleChatSchema = mongoose.Schema({
    lastMassage:{
        type:String,
        default:'',
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
    massage:[]
},{timestamps:true},{_id:false})

module.exports = mongoose.model('singleChat',singleChatSchema)