var express = require('express')
var router = express.Router()
var dataDatesController = require('../controllers/dataDatesController.js')

router.get('/', dataDatesController.list)
router.post('/', dataDatesController.create)
router.put('/:id', dataDatesController.update)
router.delete('/:id', dataDatesController.remove)

router.get('/search', dataDatesController.search)

router.post('/seed', dataDatesController.seed)

module.exports = router
