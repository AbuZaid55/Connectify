const router = require('express').Router()
const {createMassage} = require('../controller/massageController.js')

router.post('/createmassage',createMassage)
module.exports = router