const router = require('express').Router()
const auth = require('../middleware/userAuth.js')
const upload = require('../utils/uploadFile.js')
const {user,signUp,verifyEmail,logIn,resendOtp,sendResetLink, changePass, getProfile, editProfile, logout, uploadPic} = require('../controller/userController.js')

router.get('/auth/user',auth,user)
router.post('/signup',signUp)
router.post('/verifyemail',verifyEmail)
router.post('/resendotp',resendOtp)
router.post('/login',logIn)
router.post('/sendresetlink',sendResetLink)
router.post('/changepass',changePass)
router.post('/getprofile',getProfile)
router.post('/editprofile',editProfile)
router.post('/logout',logout)
router.post('/uploadpic',upload.single('file'),uploadPic)


module.exports = router;