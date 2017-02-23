var usersModel = require('../models/usersModel.js')

module.exports = {
  list: function (req, res) {
    usersModel.find(function (err, userss) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting users.',
          error: err
        })
      }
      return res.json(userss)
    })
  },

  create: function (req, res) {
    var users = new usersModel({      username: req.body.username,      password: req.body.password
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
      return res.status(204).json()
    })
  }
}
