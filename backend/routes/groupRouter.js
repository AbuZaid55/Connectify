const router = require('express').Router()
const { createGroup,getGroupChat,updateReadMassge ,clearAllChats} = require('../controller/groupController.js')

router.post('/creategroup',createGroup)
router.post('/getgroupchat',getGroupChat)
router.post('/updatereadmassage',updateReadMassge)
router.post('/clearallchats',clearAllChats)

module.exports=router