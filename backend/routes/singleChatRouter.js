const router = require('express').Router()
const {createChat, getChat, blockChat} = require('../controller/singleChatController.js')

router.post('/createchat',createChat)
router.post('/getchat',getChat)
router.post('/blockChat',blockChat)

module.exports = router