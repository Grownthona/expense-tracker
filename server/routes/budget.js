const router = require('express').Router();
const checkLogin = require('../middlewares/checkLogin');
let Budget = require('../models/budgetModel');
let Catagory = require('../models/catagoryModel');
let UserCategory = require('../models/userCatagoryModel');
const bodyParser = require("body-parser");

router.use(bodyParser.json());


router.route('/addnewcategory').post( async (req, res) => {
  const {user,category,amount} = req.body;
  console.log(user+' '+category+' '+amount);
  try {
    const newCategory = new UserCategory({
      user : user,
      category : category,
      amount : amount
    });
    await newCategory.save();
    return res.status(201).json({ message: 'New Category added!' });
    
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.route('/addbudget').post(async (req, res) => {
  try {
    const { budget } = req.body;
    const { _id, user, totalBudget, budgets, date} = budget;

    const updateBudget = { 
      user: user,
      totalBudget : totalBudget,
      budgets : budgets
    };
    await Budget.findOneAndUpdate({ user : user }, updateBudget, {new: true});
    return res.status(201).json({ message : "Budget Updated" });
  }catch (err) {
    res.status(500).send('Server error');
  }
});

router.route('/').get(checkLogin,async (req, res) => {

    const userId = req.userId;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;     
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1); 
    const endOfMonth = new Date(currentYear, currentMonth, 0);

    const categories = await Catagory.find({});
    const userCategory = await UserCategory.find({ user: userId });
    const CurrentMonthBudget = await Budget.findOne({ user: userId, date: { $gte: startOfMonth, $lte: endOfMonth } });
    const budgetId = CurrentMonthBudget._id;

    if(CurrentMonthBudget){
      //The user has current month budget
      const mergedCategoryWithBudget = userCategory.map(item => ({
        category: item.category,
        amount: item.amount
      }));

      Budget.updateOne({ _id: budgetId }, { $push: { budgets: mergedCategoryWithBudget } } )
        .then(result => {
           return res.json(CurrentMonthBudget);
        })
        .catch(error => {
          res.status(500).send(error);
      });

    }else{
      //User does not have current month budget so show default categories with amount 

      const budgetCategories = categories.map(category => ({
        category: category.name,
        amount: 0.0
      }));

      //The user has added new category
      const  mergedCategoryWithBudget = userCategory.map(item => ({
        category: item.category,
        amount: 0.0
      }));
      
      //The mergedArray will show the newly added category with default category
      const mergedArray = [...budgetCategories, ...mergedCategoryWithBudget];
      const categoryWithDefaultBudget = new Budget({ 
        user : userId,
        totalBudget : 0.0,
        budgets : mergedArray 
      });

      await categoryWithDefaultBudget.save();
      res.json({ categoryWithDefaultBudget });
    }
  });

module.exports = router;