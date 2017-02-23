var express = require('express')
var router = express.Router()
var usersController = require('../controllers/usersController.js')

router.post('/login', usersController.list)
router.post('/', usersController.register)

router.get('/', usersController.list)
router.delete('/:id', usersController.remove)

module.exports = router
