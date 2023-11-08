const router = require('express').Router()
const { createGroup,getGroupChat,updateReadMassge } = require('../controller/groupController.js')

router.post('/creategroup',createGroup)
router.post('/getgroupchat',getGroupChat)
router.post('/updatereadmassage',updateReadMassge)

module.exports=router