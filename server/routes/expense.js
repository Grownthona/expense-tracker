const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.json());

let Catagory = require('../models/catagoryModel');
let Expense = require('../models/expenseModel');

function extractMonthAndYearFromDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; 
  const year = date.getFullYear();
  return { month, year };
}

router.route('/addcatagory').post(async(req, res) => {

    const name = req.body.name;

    try {
      const newCatagory = new Catagory({name});
      await newCatagory.save();
      return res.status(201).json('Catagory created successfully' );
    } catch(err){
      return res.status(400).json(err);
    }
  });

  function getMonthName(month) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1]; // Adjust index to match conventional month numbering
  }
  function getMonthName(month) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    for(let i=0;i<monthNames.length;i++){
      if(monthNames[i] === month){
        return i+1;
      }
    }
    return -1; // Adjust index to match conventional month numbering
  }
  router.route('/monthlyexpense').post(checkLogin,async(req, res) => {

    const monthName = req.body.selectedMonth;
    const userId = req.userId;
    const month = getMonthName(monthName);
    
    const currentYear = new Date().getFullYear();
    
    try {
      //console.log(month);
      const expense = await Expense.find({user:userId,month: month,year:currentYear });
      return res.json(expense);
    } catch(err){
      return res.status(400).json(err);
    }

  });


  router.route('/addexpense').post(async(req, res) => {
    const {user, category, amount,budget, description,paymentmethod,location,date} = req.body;
    const { month, year } = extractMonthAndYearFromDate(date);

    try {
      const newExpense = new Expense({user, category, amount,budget, description,paymentmethod,location,month,year,date});
      await newExpense.save();
      return res.status(201).json('New Expense added successfully' );
    } catch(err){
      return res.status(400).json(err);
    }
  });

  router.route('/updateexpense').post(async(req, res) => {
    const {id,user, category, amount,budget, description,paymentmethod,location,date} = req.body;
    const { month, year } = extractMonthAndYearFromDate(date);
    console.log(req.body);
    try {
      const updateExpense = { 
      user: user,
      category:category,
      amount : amount,
      budget : budget,
      description:description,
      paymentmethod : paymentmethod,
      location : location,
      month : month,
      year : year,
      date : date
    };

    await Expense.findOneAndUpdate({ _id : id }, updateExpense, {new: true});
    return res.status(201).json({ message : "Expense Updated" });
      
    } catch(err){
      return res.status(400).json(err);
    }
  });

  router.route('/deleteexpense').post(async(req, res) => {
    
    try {
      const expenseId = req.body;
      
      const deletedExpense = await Expense.findByIdAndDelete(expenseId);
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.route('/').get(checkLogin,async(req, res) => {
    const userId = req.userId;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;     
    

    const monthlyExpense = await Expense.find({ user: userId , month: currentMonth, year: currentYear}).
    then(result => {
      if(result && result.length > 0){
        return res.json(result);
      }else{
        return res.status(404).json({ message : "Not found"});
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });


  });
  module.exports = router;