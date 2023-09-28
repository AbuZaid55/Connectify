const router = require('express').Router()
const {createMassage} = require('../controller/singleMassageController.js')

router.post('/createmassage',createMassage)
module.exports = router