const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('CustomMessage', MemberSchema);
