var datasModel = require('../models/datasModel.js');

/**
 * datasController.js
 *
 * @description :: Server-side logic for managing datass.
 */
module.exports = {

    /**
     * datasController.list()
     */
    list: function (req, res) {
        datasModel.find(function (err, datass) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting datas.',
                    error: err
                });
            }
            return res.json(datass);
        });
    },

    /**
     * datasController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        datasModel.findOne({_id: id}, function (err, datas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting datas.',
                    error: err
                });
            }
            if (!datas) {
                return res.status(404).json({
                    message: 'No such datas'
                });
            }
            return res.json(datas);
        });
    },

    /**
     * datasController.create()
     */
    create: function (req, res) {
        var datas = new datasModel({			letter : req.body.letter,			frequency : req.body.frequency
        });

        datas.save(function (err, datas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating datas',
                    error: err
                });
            }
            return res.status(201).json(datas);
        });
    },

    /**
     * datasController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        datasModel.findOne({_id: id}, function (err, datas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting datas',
                    error: err
                });
            }
            if (!datas) {
                return res.status(404).json({
                    message: 'No such datas'
                });
            }

            datas.letter = req.body.letter ? req.body.letter : datas.letter;			datas.frequency = req.body.frequency ? req.body.frequency : datas.frequency;			
            datas.save(function (err, datas) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating datas.',
                        error: err
                    });
                }

                return res.json(datas);
            });
        });
    },

    /**
     * datasController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        datasModel.findByIdAndRemove(id, function (err, datas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the datas.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
