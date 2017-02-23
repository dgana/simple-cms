var dataDatesModel = require('../models/dataDatesModel.js')

module.exports = {
  list: function (req, res) {
    dataDatesModel.find(function (err, datas) {
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
    var datas = new datasModel({
      date: req.body.date,
      frequency: req.body.frequency
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
    dataDatesModel.findOneAndUpdate({_id: id}, { date: req.body.date, frequency: req.body.frequency }, {new: true}, function (err, doc) {
      if (err) return res.send(500, { error: err })
      return res.json(doc)
    })
  },

  remove: function (req, res) {
    var id = req.params.id
    dataDatesModel.findByIdAndRemove(id, function (err, datas) {
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

    if (req.query.f) {
      dataDatesModel.find({ $and: [{ frequency: req.query.f }, { letter: search }] }, function (err, datas) {
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
    } else if (/^\d/.test(search)) {
      dataDatesModel.find({ $and: [{ frequency: search }, { letter: { $exists: true }}] }, function (err, datas) {
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
    } else {
      dataDatesModel.find({ $and: [{ letter: search }, { frequency: { $exists: true }}] }, function (err, datas) {
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
}
