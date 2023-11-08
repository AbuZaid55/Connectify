const router = require('express').Router()
const { createGroup,getGroupChat } = require('../controller/groupController.js')

router.post('/creategroup',createGroup)
router.post('/getgroupchat',getGroupChat)

module.exports=router