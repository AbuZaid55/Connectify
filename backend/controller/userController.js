const {sendSuccess,sendError} = require('../utils/sendResponse.js')
const emailValidator = require('email-validator')
const userModel = require('../models/userModel.js')
const verifyEmailModel = require('../models/verifyEmailModel.js')
const generateOtp = require('../utils/generateOtp.js')
const {sendOtp} = require('../utils/sendMail.js')

const signUp = async(req,res)=>{
    const {name,email,password,confirm_pass}=req.body
    
    if(!name || !email || !password || !confirm_pass){
       return sendError(res,"All field are required!")
    }
    if(password.length<8 || password.length>12){
        return sendError(res,"Your password should be between 8 to 12 character")
    }
    if(password!==confirm_pass){
        return sendError(res,'Password does not match!')
    }
    if(!emailValidator.validate(email)){
        return sendError(res,"Invalid Email!")
    }
    try {
        const isExist = await userModel.findOne({email:email})
        if(isExist){
            return sendError(res,"Email already exists")
        }
        const user = await userModel({name,email,password})
        const OTP = generateOtp()
        await verifyEmailModel({userId:user._id,otp:OTP}).save()
        await user.save()
        sendOtp(user.email,OTP)
        sendSuccess(res,{massage:'Otp has been send to your email id'})
    } catch (error) {
        console.log(error)
        sendError(res,"Sign Up Failed")
    }
}

module.exports = {
    signUp,
}