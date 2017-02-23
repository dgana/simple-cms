var express = require('express')
var router = express.Router()
var datasController = require('../controllers/datasController.js')

router.get('/', datasController.list)
router.post('/', datasController.create)
router.put('/:id', datasController.update)
router.delete('/:id', datasController.remove)

router.get('/search', datasController.search)
// router.get('/searchAll', datasController.searchAll)

module.exports = router
