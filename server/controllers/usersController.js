var usersModel = require('../models/usersModel.js')
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
  list: function (req, res) {
    usersModel.find(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting users.',
          error: err
        })
      }
      return res.json(users)
    })
  },

  create: function (req, res) {
    var users = new usersModel({      username: req.body.username,      password: hash.generate(req.body.password)
    })

    users.save(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating users',
          error: err
        })
      }
      return res.status(201).json(users)
    })
  },

  remove: function (req, res) {
    var id = req.params.id
    usersModel.findByIdAndRemove(id, function (err, users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the users.',
          error: err
        })
      }
      return res.status(201).json(users)
    })
  },

  login: function (req, res) {
    console.log(req)
    let token = jwt.sign({ username: req.body.username}, 'secret')
    res.json({
      token: token,
      username: req.body.username
    })
  },

  verify: function (req, res, next) {
    if (!req.headers.token) {
      res.json("You don't have access")
    } else {
      if (jwt.verify(req.headers.token, 'secret')) {
        next()
      } else {
        res.json('Invalid Token')
      }
    }
  }
}
