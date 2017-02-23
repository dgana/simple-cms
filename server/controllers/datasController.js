var datasModel = require('../models/datasModel.js')
const seedData = require('../seeder/seedData')
const mongoose = require('mongoose')

module.exports = {
  seed: function (req, res) {
    mongoose.connection.db.dropCollection('datas', (err, result) => {
      if (err) throw err
      console.log('Dropped collection: datas')
    })

    datasModel.create(seedData, (err, datas) => {
      if (err) throw err
      res.json(datas)
    })
  },

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
    datasModel.findOneAndUpdate({_id: id}, { letter: req.body.letter, frequency: req.body.frequency }, {new: true}, function (err, doc) {
      if (err) return res.send(500, { error: err })
      return res.json(doc)
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

    if (req.query.f) {
      datasModel.find({ $and: [{ frequency: req.query.f }, { letter: search }] }, function (err, datas) {
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
      datasModel.find({ $and: [{ frequency: search }, { letter: { $exists: true }}] }, function (err, datas) {
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
      datasModel.find({ $and: [{ letter: search }, { frequency: { $exists: true }}] }, function (err, datas) {
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
