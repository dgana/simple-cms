var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dataDatesSchema = new Schema({	'date' : String,	'frequency' : Number});

module.exports = mongoose.model('dataDates', dataDatesSchema);
