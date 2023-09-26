const sendError = (res,massage,status=400)=>{
    res.status(status).json({massage:massage})
}

const sendSuccess = (res,data,status=200)=>{
    res.status(status).json(data)
}

module.exports = {
    sendError,
    sendSuccess
}