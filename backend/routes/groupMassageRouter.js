const router = require('express').Router()
const {createMassage,deleteMassage} = require('../controller/groupMassageController.js')

router.post('/createmassage',createMassage)
router.post('/deletemassage',deleteMassage)
module.exports = router