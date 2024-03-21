# Budget Tracker

This is a simple budget tracker website designed to help you manage your finances more effectively. With this website, you can track your income, expenses, and view your overall financial health through intuitive graphs and charts.



## Screenshots and Description

#### Home
![home](https://github.com/Grownthona/expense-tracker/assets/78976756/2afaa004-7554-42cc-a998-813d747b241a)


#### Dashboard
![dashboard](https://github.com/Grownthona/expense-tracker/assets/78976756/966b18c8-3193-406b-bb2b-205d51770cdc)

#### Budget

![budget list](https://github.com/Grownthona/expense-tracker/assets/78976756/1838d928-b37e-413d-9f91-455c0ee7d8d3)

![add budget](https://github.com/Grownthona/expense-tracker/assets/78976756/39b31094-4525-4e64-859a-327fa528b8ea)

![add new category](https://github.com/Grownthona/expense-tracker/assets/78976756/08623970-d59b-4d7c-a857-3f9b84bc6272)

![add total monthly budget](https://github.com/Grownthona/expense-tracker/assets/78976756/bd2f1836-471d-476f-b56f-433427509f52)


#### Budget Errors
![monthly budget exceed error](https://github.com/Grownthona/expense-tracker/assets/78976756/5153cb7e-d00b-4f68-99d9-6398cafd3aec)

![budget exceed error](https://github.com/Grownthona/expense-tracker/assets/78976756/0e11f8aa-1bc5-4bf6-8d45-a43ee3e1547c)

#### Expense
![expense list](https://github.com/Grownthona/expense-tracker/assets/78976756/15062c41-8506-429c-877a-1dbc095e8045)

![Add Expense Detail](https://github.com/Grownthona/expense-tracker/assets/78976756/526aeefd-15c3-4076-83cd-1e4d246bf799)

![update expense](https://github.com/Grownthona/expense-tracker/assets/78976756/3c3ad0aa-4afc-4cee-a73f-92b39f830f2d)


#### Track Budget Expense
![trackexpense](https://github.com/Grownthona/expense-tracker/assets/78976756/703d2a05-d514-41d6-9cb3-943d9771e19b)


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
  


