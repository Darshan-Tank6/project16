const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('Notice', NoticeSchema);
