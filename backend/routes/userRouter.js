const router = require('express').Router()
const {signUp,verifyEmail,logIn,resendOtp,sendResetLink, changePass} = require('../controller/userController.js')

router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/resendotp',resendOtp)
router.post('/login',logIn)
router.post('/sendresetlink',sendResetLink)
router.post('/changepass',changePass)

module.exports = router;