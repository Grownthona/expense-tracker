# Budget Tracker

This is a simple budget tracker website designed to help you manage your finances more effectively. With this website, you can track your income, expenses, and view your overall financial health through intuitive graphs and charts.



## Features

- **Income and Expense Tracking** : The website offers an easy-to-use interface for entering and managing your financial data.


- **Sign Up / Log In** : Create an account or log in to your existing account to access the budget tracking features.

- **Add Transactions** : Record your income and expenses by specifying the amount, category, and date of each transaction.

- **Set Budgets** : Set monthly budgets for different expense categories such as groceries, transportation, entertainment, etc.

- **Track Spending** : Monitor your spending habits by viewing the breakdown of your expenses and comparing them to your budget.

- **View Reports** : Explore detailed reports and visualizations to gain insights into your financial behavior over time.



## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** Mongoose

**Frontend:** MUI, JavaScript

## Run Locally

Clone the project

```bash
  git clone https://github.com//Grownthona/expense-tracker.git

```

Go to the project directory


Install dependencies

```bash
  npm install
```

Start the server

```bash
  cd server
```
```bash
  npm run dev
```
Start the client

```bash
  cd client
```
```bash
  npm start
```

# DB Dumps

## BudgetSchema:

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
    type: Number
    default: new Date().getFullYear()
  },
  date: {
    type: Date,
    default: Date.now
  }
});

## CategorySchema:

const categorySchema = new mongoose.Schema({
  name: String
});

## CategorySchema:

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

## User Added Category Schema
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

## User Schema
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
  });
  


