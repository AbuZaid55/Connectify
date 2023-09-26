const router = require('express').Router()
const {signUp} = require('../controller/userController.js')

router.post('/signup',signUp)

module.exports = router;