const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  amountDonated: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Member', MemberSchema);
