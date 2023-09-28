const router = require('express').Router()
const {createChat, getChat} = require('../controller/singleChatController.js')

router.post('/createchat',createChat)
router.post('/getchat',getChat)

module.exports = router