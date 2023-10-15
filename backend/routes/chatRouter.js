const router = require('express').Router()
const {searchUsers,createChat, getSingleChat, blockChat, unblock, updateReadMassge,clearAllChats, deleteChat} = require('../controller/chatController.js')

router.post('/searchusers',searchUsers)
router.post('/createchat',createChat)
router.post('/getsinglechat',getSingleChat)
router.post('/blockchat',blockChat)
router.post('/unblockchat',unblock)
router.post('/updatereadmassage',updateReadMassge)
router.post('/clearallchats',clearAllChats)
router.post('/deletechat',deleteChat)

module.exports = router