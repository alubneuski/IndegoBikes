var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: String,
  email: String
});
mongoose.model('users', userSchema);
module.exports = mongoose;