const {sendSuccess,sendError} = require('../utils/sendResponse.js')
const emailValidator = require('email-validator')
const userModel = require('../models/userModel.js')
const verifyEmailModel = require('../models/verifyEmailModel.js')
const generateOtp = require('../utils/generateOtp.js')
const {sendOtp,greetingMail} = require('../utils/sendMail.js')

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
            return sendError(res,"Email already exists!")
        }
        const user = await userModel({name,email,password})
        const OTP = generateOtp()
        await verifyEmailModel({userId:user._id,otp:OTP}).save()
        await user.save()
        sendOtp(user.email,OTP)
        sendSuccess(res,{massage:'Otp has been send to your email id',userId:user._id})
    } catch (error) {
        console.log(error)
        sendError(res,"Sign Up Failed")
    }
}

const verifyEmail = async(req,res)=>{
    const {userId,otp} = req.body 
    if(!userId || !otp){
        return sendError(res,"Invalid credentials!")
    }
    const user = await userModel.findOne({_id:userId})
    if(!user){
        return sendError(res,"Invalid User!")
    }
    if(user.validated){
        return sendError(res,"This account is already verified!")
    }
    
    const verifyEmailData = await verifyEmailModel.findOne({userId:userId})
    if(!verifyEmailData){
        return sendError(res,"OTP has expired!")
    }
    const verifyOtp = await verifyEmailData.compareOtp(otp)
    if(!verifyOtp){
        return sendError(res,"Please provied a valid OTP")
    }
    user.validated = true
    await verifyEmailModel.findByIdAndDelete(verifyEmailData._id)
    await user.save()

    greetingMail(user.email,"Your account has been verfied.")
    sendSuccess(res,{massage:"Your account has been verified."})
}

const logIn = async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return sendError(res,'All field are required!')
    }
    if(!emailValidator.validate(email)){
        return sendError(res,"Invalid Email!")
    }
    const user = await userModel.findOne({email:email})
    if(!user){
        return sendError(res,"User not found!")
    }
    try {
        const matchPass = await user.comparePass(password)
        if(!matchPass){
            return sendError(res,"Password does not match!")
        }
        if(!user.validated){
            const verifyEmailData = await verifyEmailModel.findOne({userId:user._id})
            if(verifyEmailData){
                return sendSuccess(res,{massage:"Otp has been send to your email id",userId:user._id},202)
            }
            const OTP = generateOtp()
            await verifyEmailModel({userId:user._id,otp:OTP}).save()
            sendOtp(user.email,OTP)
            return sendSuccess(res,{massage:"Otp has been send to your email id",userId:user._id},202)
        }
        sendSuccess(res,{massage:"Login successfull"})
    } catch (error) {
        sendError(res,"Login Failed!")
    }
}

module.exports = {
    signUp,
    verifyEmail,
    logIn,
}