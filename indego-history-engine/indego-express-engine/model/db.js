var mongoose = require('monk');
var mongo = require('mongodb');
var db = mongoose('localhost:27017/users');
module.exports = mongoose;
