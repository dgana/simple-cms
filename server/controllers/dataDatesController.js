var dataDatesModel = require('../models/dataDatesModel.js');

/**
 * dataDatesController.js
 *
 * @description :: Server-side logic for managing dataDatess.
 */
module.exports = {

    /**
     * dataDatesController.list()
     */
    list: function (req, res) {
        dataDatesModel.find(function (err, dataDatess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDates.',
                    error: err
                });
            }
            return res.json(dataDatess);
        });
    },

    /**
     * dataDatesController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        dataDatesModel.findOne({_id: id}, function (err, dataDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDates.',
                    error: err
                });
            }
            if (!dataDates) {
                return res.status(404).json({
                    message: 'No such dataDates'
                });
            }
            return res.json(dataDates);
        });
    },

    /**
     * dataDatesController.create()
     */
    create: function (req, res) {
        var dataDates = new dataDatesModel({			date : req.body.date,			frequency : req.body.frequency
        });

        dataDates.save(function (err, dataDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating dataDates',
                    error: err
                });
            }
            return res.status(201).json(dataDates);
        });
    },

    /**
     * dataDatesController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        dataDatesModel.findOne({_id: id}, function (err, dataDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataDates',
                    error: err
                });
            }
            if (!dataDates) {
                return res.status(404).json({
                    message: 'No such dataDates'
                });
            }

            dataDates.date = req.body.date ? req.body.date : dataDates.date;			dataDates.frequency = req.body.frequency ? req.body.frequency : dataDates.frequency;			
            dataDates.save(function (err, dataDates) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating dataDates.',
                        error: err
                    });
                }

                return res.json(dataDates);
            });
        });
    },

    /**
     * dataDatesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        dataDatesModel.findByIdAndRemove(id, function (err, dataDates) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the dataDates.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
