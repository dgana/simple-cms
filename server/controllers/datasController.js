var datasModel = require('../models/datasModel.js')

module.exports = {
  list: function (req, res) {
    datasModel.find(function (err, datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting datas.',
          error: err
        })
      }
      return res.json(datas)
    })
  },

  create: function (req, res) {
    var datas = new datasModel({      letter: req.body.letter,      frequency: req.body.frequency
    })

    datas.save(function (err, datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating datas',
          error: err
        })
      }
      return res.status(201).json(datas)
    })
  },

  update: function (req, res) {
    var id = req.params.id
    datasModel.findOne({_id: id}, function (err, datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting datas',
          error: err
        })
      }
      if (!datas) {
        return res.status(404).json({
          message: 'No such datas'
        })
      }

      datas.letter = req.body.letter || datas.letter;      datas.frequency = req.body.frequency || datas.frequency

      datas.save(function (err, datas) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating datas.',
            error: err
          })
        }

        return res.json(datas)
      })
    })
  },

  remove: function (req, res) {
    var id = req.params.id
    datasModel.findByIdAndRemove(id, function (err, datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the datas.',
          error: err
        })
      }
      return res.status(201).json(datas)
    })
  },

  search: function (req, res) {
    let search = req.query.q
    datasModel.find({ $and: [{ letter: search }, { frequency: { $exists: true }}] }, function (err, data) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the datas.',
          error: err
        })
      }
      if (!datas) {
        return res.status(404).json({
          message: 'No such datas'
        })
      }
      return res.json(datas)
    })
  }
}
