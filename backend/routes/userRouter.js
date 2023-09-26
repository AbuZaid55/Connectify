const router = require('express').Router()
const {signUp,verifyEmail,logIn} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/login',logIn)

module.exports = router;