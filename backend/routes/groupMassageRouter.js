const router = require('express').Router()
const {createMassage,deleteMassage, massageInfo} = require('../controller/groupMassageController.js')

router.post('/createmassage',createMassage)
router.post('/deletemassage',deleteMassage)
router.post('/massageinfo',massageInfo)
module.exports = router