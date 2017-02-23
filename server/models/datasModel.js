var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var datasSchema = new Schema({	'letter' : String,	'frequency' : Number});

module.exports = mongoose.model('datas', datasSchema);
