const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const os = require('os')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
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
    validated:{
        type:Boolean,
        default:false,
        required:true
    },
    blocklist:[mongoose.Schema.Types.ObjectId],
    loggedIn:[
        {
            token:{
                type:String,
                required:true
            },
            deviceName:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre('save',async function (next){
    if(this.modified('password')){
        const hastPass = await bcrypt.hash(this.password)
        this.password = hastPass
    }
    next()
})

userSchema.methods = {
    async comparePass(password){
        return await bcrypt.compare(password,this.password)
    },
    generateToken(){
        const token = JWT.sign({_id:this._id,email:this.email},process.env.JWT_KEY)
        this.loggedIn = this.loggedIn.concat({token:token,deviceName:os.hostname()})
        return token
    },
    verifyToken(token){
        return JWT.verify(token,process.env.JWT_KEY)
    }
}