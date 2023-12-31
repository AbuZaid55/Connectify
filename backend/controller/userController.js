const JWT = require("jsonwebtoken")
const { sendSuccess, sendError } = require('../utils/sendResponse.js')
const emailValidator = require('email-validator')
const userModel = require('../models/userModel.js')
const verifyEmailModel = require('../models/verifyEmailModel.js')
const changePassModel = require('../models/changePassModel.js')
const generateOtp = require('../utils/generateOtp.js')
const { sendOtp, greetingMail, sendLink } = require('../utils/sendMail.js')
const cloudinary = require('cloudinary')
const fs = require('fs/promises')

const user = (req, res) => {
    sendSuccess(res, { user: req.rootUser })
}
const signUp = async (req, res) => {
    const { name, email, password, confirm_pass } = req.body

    if (!name || !email || !password || !confirm_pass) {
        return sendError(res, "All field are required!")
    }
    if (password.length < 8 || password.length > 12) {
        return sendError(res, "Your password should be between 8 to 12 character")
    }
    if (password !== confirm_pass) {
        return sendError(res, 'Password does not match!')
    }
    if (!emailValidator.validate(email)) {
        return sendError(res, "Invalid Email!")
    }
    try {
        const isExist = await userModel.findOne({ email: email })
        if (isExist) {
            return sendError(res, "Email already exists!")
        }
        const user = await userModel({ name, email, password })
        const OTP = generateOtp()
        await verifyEmailModel({ userId: user._id, otp: OTP }).save()
        await user.save()
        sendOtp(user.email, OTP)
        sendSuccess(res, { massage: 'Otp has been send to your email id', userId: user._id })
    } catch (error) {
        sendError(res, "Sign Up Failed")
    }
}
const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body
    if (!userId || !otp) {
        return sendError(res, "Invalid credentials!")
    }
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return sendError(res, "Invalid User!")
    }
    if (user.validated) {
        return sendError(res, "This account is already verified!")
    }

    const verifyEmailData = await verifyEmailModel.findOne({ userId: userId })
    if (!verifyEmailData) {
        return sendError(res, "OTP has expired!")
    }
    const verifyOtp = await verifyEmailData.compareOtp(otp)
    if (!verifyOtp) {
        return sendError(res, "Please provied a valid OTP")
    }
    user.validated = true
    await verifyEmailModel.findByIdAndDelete(verifyEmailData._id)
    await user.save()

    greetingMail(user.email, "Your account has been verfied.")
    sendSuccess(res, { massage: "Your account has been verified." })
}
const resendOtp = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return sendError(res, "Invalid User!")
        }
        if (user.validated) {
            return sendError(res, "This account is already verified!")
        }
        await verifyEmailModel.deleteMany({ userId: user._id })
        const OTP = generateOtp()
        await verifyEmailModel({ userId: user._id, otp: OTP }).save()
        sendOtp(user.email, OTP)
        sendSuccess(res, { massage: 'Otp has been send to your email id' })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const logIn = async (req, res) => {
    const { email, password, hostname } = req.body
    if(!hostname){
        return sendError("Your device is not supported!")
    }
    if (!email || !password) {
        return sendError(res, 'All field are required!')
    }
    if (!emailValidator.validate(email)) {
        return sendError(res, "Invalid Email!")
    }
    const user = await userModel.findOne({ email: email })
    if (!user) {
        return sendError(res, "Invalid User!")
    }
    try {
        const matchPass = await user.comparePass(password)
        if (!matchPass) {
            return sendError(res, "Password does not match!")
        }
        if (!user.validated) {
            const verifyEmailData = await verifyEmailModel.findOne({ userId: user._id })
            if (verifyEmailData) {
                return sendSuccess(res, { massage: "Otp has been send to your email id", userId: user._id }, 202)
            }
            const OTP = generateOtp()
            await verifyEmailModel({ userId: user._id, otp: OTP }).save()
            sendOtp(user.email, OTP)
            return sendSuccess(res, { massage: "Otp has been send to your email id", userId: user._id }, 202)
        }
        const token = await user.generateToken()
        res.cookie('ConnectifyToken', token, {
            expires: new Date(Date.now() + Number(process.env.EXPIRE_COOKIE_TIME)),
            onlyhttp: true
        })
        user.loggedIn=user.loggedIn.concat({ token: token, deviceName: hostname })
        await user.save()
        sendSuccess(res, { massage: "Login successfull" })
    } catch (error) {
        sendError(res, "Login Failed!")
    }
}
const sendResetLink = async (req, res) => {
    const { email } = req.body
    if (!email) {
        return sendError(res, "Please enter your email!")
    }
    if (!emailValidator.validate(email)) {
        return sendError(res, "Invalid Email!")
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return sendError(res, "Invalid User!")
        }
        const isExistToken = await changePassModel.findOne({ userId: user._id })
        if (isExistToken) {
            return sendError(res, "Reset Link already send to your email id!")
        }
        const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY)
        await changePassModel({ userId: user._id, token: token }).save()

        sendLink(user.email, `${process.env.FRONTEND_URL}/changepass?id=${user._id}&token=${token}`)
        sendSuccess(res, { massage: "Reset link sent successfull to your email id" })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const changePass = async (req, res) => {
    const { token, userId, new_pass, confirm_pass } = req.body
    if (!new_pass || !confirm_pass) {
        return sendError(res, "All field are required!")
    }
    if (new_pass.length < 8 || new_pass.length > 12) {
        return sendError(res, "Your password should be between 8 to 12 character!")
    }
    if (new_pass !== confirm_pass) {
        return sendError(res, 'Password does not match!')
    }
    if (!token || !userId) {
        return sendError(res, "Invalid credentials!")
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return sendError(res, "Invalid User!")
        }
        const DB_Token = await changePassModel.findOne({ userId: user._id })
        if (!DB_Token) {
            return sendError(res, "Invalid credentials!")
        }

        if (DB_Token.token !== token) {
            return sendError(res, "Invalid credentials!")
        }
        const oldpassMatch = await user.comparePass(new_pass)
        if (oldpassMatch) {
            return sendError(res, "The new password must be different from the old password!")
        }
        user.password = new_pass
        await changePassModel.findByIdAndDelete(DB_Token._id)
        await user.save()
        greetingMail(user.email, "Your password has been changed.")
        sendSuccess(res, { massage: "Your password has been changed." })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }

}
const getProfile = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return sendError(res, "User Id not found!")
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return sendError(res, "User not found!")
        }
        user.profile = user.profile.secure_url
        user.password = undefined
        user.validated = undefined
        user.blockList = undefined
        user.loggedIn = undefined
        sendSuccess(res, { massage: "User profile details found", user: user })
    } catch (error) {
        sendError(res, "Something went wrong!")
    }
}
const editProfile = async (req, res) => {
    const { userId, name, bio } = req.body
    if (!userId) {
        return sendError(res, "User Id not found!")
    }
    if(!name || !bio){
        return sendError(res,"All field are required!")
    }
    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return sendError(res, "User not found!")
        }
        user.name = name
        user.bio = bio
        await user.save()
        sendSuccess(res, { massage: "Data update successfully" })
    } catch (error) {
        sendError(res, 'Something went wrong!')
    }
}
const logout = async (req, res) => {
    const { tokenId } = req.body
    try {
        const token = req.cookies.ConnectifyToken
        if (!tokenId || !token) {
            return sendError(res, "Token not found!")
        }
        const verifyToken = JWT.verify(token, process.env.JWT_KEY)
        const user = await userModel.findById(verifyToken._id)
        if (!user) {
            return sendError(res, "Invalid user!")
        }
        user.loggedIn = user.loggedIn.filter((object) => {
            if (object._id == tokenId) {
                if (object.token === token) {
                    res.clearCookie("ConnectifyToken")
                }
            } else {
                return object
            }
        })
        await user.save()
        sendSuccess(res, { massage: "User logout successfully" })
    } catch (error) {
        console.log(error)
        sendError(res, "Something went wrong!")
    }
}
const uploadPic = async (req, res) => {
    if (req.fileError) {
        return sendError(res, req.fileError)
    }
    const _id = (req.body && req.body._id) ? req.body._id : ''
    const profile = (req.file && req.file.filename) ? req.file.filename : ''
    if (profile === '') {
        return sendError(res, "Please select profile pic!")
    }
    if (_id === '') {
        return sendError(res, "Invalid User!")
    }
    try {
        const user = await userModel.findById(_id)
        if (!user) {
            return sendError(res, "Invalid user!")
        }
        if (user.profile.public_id !== '') {
            await cloudinary.uploader.destroy(user.profile.public_id)
        }
        const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'Connectify_Profile', gravity: 'faces' })

        if (result) {
            user.profile.public_id = result.public_id
            user.profile.secure_url = result.secure_url
        }
        await user.save()
        fs.rm(req.file.path)
        sendSuccess(res, "Profile uploaded successfully")
    } catch (error) {
        sendError(res, "Something went wrong!")
    }

}

module.exports = {
    user,
    signUp,
    verifyEmail,
    logIn,
    resendOtp,
    sendResetLink,
    changePass,
    getProfile,
    editProfile,
    logout,
    uploadPic
}