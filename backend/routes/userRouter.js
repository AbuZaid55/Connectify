const router = require('express').Router()
const auth = require('../middleware/userAuth.js')
const {user,signUp,verifyEmail,logIn,resendOtp,sendResetLink, changePass, getProfile} = require('../controller/userController.js')

router.get('/auth/user',auth,user)
router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/resendotp',resendOtp)
router.post('/login',logIn)
router.post('/sendresetlink',sendResetLink)
router.post('/changepass',changePass)
router.post('/getprofile',getProfile)


module.exports = router;