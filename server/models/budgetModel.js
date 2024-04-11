const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalBudget :{ 
    type: Number 
  },
  budgets: [{
    category: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
    }
  }],
  month : {
    type: Number,
    default: new Date().getMonth() + 1
  },
  year : {
    type: Number,
    default: new Date().getFullYear()
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
