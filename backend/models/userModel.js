const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    profile: {
        public_id: {
            type: String,
            default: '',
        },
        secure_url: {
            type: String,
            default: '',
        }
    },
    validated: {
        type: Boolean,
        default: false,
        required: true
    },
    bio: {
        type: String,
        default: 'Hey there! I am using Connectify',
        required: true
    },
    blockList: [
        {
            _id:false,
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            chatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'singleChat',
            }
        }
    ],
    loggedIn: [
        {
            token: {
                type: String,
                required: true
            },
            deviceName: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hastPass = await bcrypt.hash(this.password, 12)
        this.password = hastPass
    }
    next()
})

userSchema.methods = {
    async comparePass(password) {
        return await bcrypt.compare(password, this.password)
    },
    async generateToken() {
        const token = JWT.sign({ _id: this._id, email: this.email }, process.env.JWT_KEY)
        return token
    },
    verifyToken(token) {
        return JWT.verify(token, process.env.JWT_KEY)
    }
}

module.exports = mongoose.model('user', userSchema)