const router = require('express').Router()
const {signUp} = require('../controller/userController.js')

router.get('/',signUp)

module.exports = router;