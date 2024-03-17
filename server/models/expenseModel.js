const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category :{ 
    type: String,
    required: true 
  },
  amount :{
    type : Number,
    required: true
  },
  budget :{
    type : Number,
    //required: true
  },
  description :{
    type : String,
  },
  paymentmethod :{
    type : String,
  },
  location :{
    type : String,
  },
  month : {
    type : String,
  },
  year : {
    type : String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
