const router = require('express').Router()
const {searchUsers,createChat, getSingleChat, blockChat, unblock} = require('../controller/chatController.js')

router.post('/searchusers',searchUsers)
router.post('/createchat',createChat)
router.post('/getsinglechat',getSingleChat)
router.post('/blockchat',blockChat)
router.post('/unblockchat',unblock)

module.exports = router