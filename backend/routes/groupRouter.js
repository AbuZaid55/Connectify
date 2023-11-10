const router = require('express').Router()
const { createGroup,getGroupChat,updateReadMassge ,clearAllChats,getSingleGroup,addUser,addAdmin,removeAdmin,removeUser,deleteGroup, editGroup} = require('../controller/groupController.js')

router.post('/creategroup',createGroup)
router.post('/getgroupchat',getGroupChat)
router.post('/updatereadmassage',updateReadMassge)
router.post('/clearallchats',clearAllChats)
router.post('/getsinglegroup',getSingleGroup)
router.post('/adduser',addUser)
router.post('/addadmin',addAdmin)
router.post('/removeadmin',removeAdmin)
router.post('/removeuser',removeUser)
router.post('/deletegroup',deleteGroup)
router.post('/editgroup',editGroup)

module.exports=router