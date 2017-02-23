var express = require('express')
var router = express.Router()
var usersController = require('../controllers/usersController.js')
const passport = require('passport')

router.post('/login', passport.authenticate('login'), usersController.login)
router.post('/', usersController.create)

router.get('/', usersController.verify, usersController.list)
router.delete('/:id', usersController.remove)

module.exports = router
