const JWT = require("jsonwebtoken")
const {sendError} = require('../utils/sendResponse.js')
const userModel = require('../models/userModel.js')
const auth=async(req,res,next)=>{ 
    try{
        const token = req.cookies.ConnectifyToken 
        if(!token){
            return sendError(res, "Unauthorized user")
        }
        const verifyToken = JWT.verify(token,process.env.JWT_KEY)
        if(!verifyToken.email || !verifyToken._id){
            return sendError(res,"Unauthorized user")
        }
        const user = await userModel.findOne({email:verifyToken.email}).populate({path:'blockList.userId',select:'name email bio profile _id'})
        if(!user || !user.validated){
            return sendError(res,"Unauthorized user")
        }
        const isTokenExist = user.loggedIn.filter((data)=>{
            return data.token===token
        })
        if(isTokenExist.length<=0){
            return sendError(res,"Unauthorized user")
        }
        user.password = undefined;
        user.loggedIn = user.loggedIn.map((object)=>{
            object.token=undefined
            return object
        })
        req.rootUser = user;
        
    }catch(err){
        console.log(err)
        return sendError(res,"Authorization Failed!")
    }
    next()
}

module.exports = auth;