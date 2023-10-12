const router = require('express').Router()
const {searchUsers,createChat, getSingleChat, blockChat} = require('../controller/chatController.js')

router.post('/searchusers',searchUsers)
router.post('/createchat',createChat)
router.post('/getsinglechat',getSingleChat)
router.post('/blockChat',blockChat)

module.exports = router