const mongoose = require('mongoose');

const usercategorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    category: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
    }
});

const UserCategory = mongoose.model('UserCategory', usercategorySchema);

module.exports = UserCategory;
