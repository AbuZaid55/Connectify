const router = require('express').Router()
const {signUp,verifyEmail,logIn,resendOtp} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/resendotp',resendOtp)
router.post('/login',logIn)

module.exports = router;