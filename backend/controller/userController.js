const {sendSuccess,sendError} = require('../utils/sendResponse.js')

const signUp = (req,res)=>{
    sendSuccess(res,{massage:"welcome"})
}

module.exports = {
    signUp,
}