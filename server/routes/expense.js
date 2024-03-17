const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

const bodyParser = require("body-parser");


router.use(bodyParser.json());

let Catagory = require('../models/catagoryModel');
let Expense = require('../models/expenseModel');
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

  router.route('/monthexpense').post(async(req, res) => {

    const month = req.body;
    console.log(month);
    /*try {
      const newCatagory = new Catagory({name});
      await newCatagory.save();
      return res.status(201).json('Catagory created successfully' );
    } catch(err){
      return res.status(400).json(err);
    }*/

  });

  router.route('/addexpense').post(async(req, res) => {
    const {user, category, amount, description,paymentmethod,location,date} = req.body;
    try {
      const newExpense = new Expense({user, category, amount, description,paymentmethod,location,date});
      await newExpense.save();
      return res.status(201).json('New Expense added successfully' );
    } catch(err){
      return res.status(400).json(err);
    }
  });
  router.route('/').get(checkLogin,async(req, res) => {
    const userId = req.userId;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;     
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1); 
    const endOfMonth = new Date(currentYear, currentMonth, 0);

    const monthlyExoense = await Expense.find({ user: userId , date: { $gte: startOfMonth, $lte: endOfMonth }});

    res.json({monthlyExoense});

  });
  module.exports = router;