const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  department: String,
  division: String,
  class: String,
  mobileNumber: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});

module.exports = mongoose.model('User', UserSchema);
