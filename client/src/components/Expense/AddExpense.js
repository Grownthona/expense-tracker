import React, { useState ,useEffect} from "react";
//import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function AddExpense(){
    //const [open, setOpen] = useState(false);
    //const [budget, setBudgets] = useState([]);
    const [budgetlist, setBudgetsList] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState('');
    const [paymentmethod, setPaymentMethod] = useState('');
    const [location, setLocation] = useState('');
    const [user,setUser] = useState('');
  
    const [categoryAmountDict, setCategoryAmountDict] = useState({});
    const [budget, setCategoryBudget] = useState(0.0);
    const [date, setSelectedDate] = useState(null);

    
    const handleDateChange = date => {
      setSelectedDate(date);
    };

    /*const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };*/
  
    useEffect(() => {
    const fetchBudget = async () => {
        try {
          const token = localStorage.getItem('token');
          if(token){
          const response = await fetch(`http://localhost:5000/budget`, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
              }
          });
          const data = await response.json();
          setBudgetsList(data.budgets);
          console.log(data.budgets);
          

          const dict = {};
          data.budgets.forEach(item => {
            dict[item.category] = item.amount;
          });
          console.log(dict);
          setCategoryAmountDict(dict);
          
          setUser(data.user);
          //setBudgets(data);
        }
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchBudget();
      
    }, []);

    function checkBudgetOfMonth(d){
      const currentDate = new Date(d);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;

      if((currentYear !== new Date().getFullYear()) ||( currentMonth !== new Date().getMonth() + 1)){
        setCategoryBudget(0.0);
      }
    }

    const handleSubmit = async() =>{
      if(date !== null && amount>0.0 && category !== ''){
        checkBudgetOfMonth(date);
      try {
        const response = await fetch('http://localhost:5000/expense/addexpense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, category, amount,budget, description, paymentmethod, location, date }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
        
    }
    }else{
      alert("Please Insert the form information to add your expense");
    }
    }

    const handleExpenseAmount = (e) => {
      const expenseCost = e.target.value;
      console.log(expenseCost);
      if(parseFloat(expenseCost)>categoryAmountDict[category]){
        alert("you're exceeding the current budget value to expense");
      }else{
        setAmount(e.target.value);
      }
    }

    const handleCategoryChange = (e) => {
      const categoryExpense = e.target.value;
      setCategory(e.target.value);
      setCategoryBudget(categoryAmountDict[categoryExpense]);
    }
    return(
        <div>
            <Button>Add Expense</Button>
            <p>{user}</p>
                <form onSubmit={handleSubmit}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" style={{width:"150px"}} value={category} label="Category" onChange={handleCategoryChange}>
                      {budgetlist.map((budget, index) => (
                        <MenuItem key={index} value={budget.category}>{budget.category}</MenuItem>
                      ))}
                      
                    </Select>
                    {budget && <p>"The selected category Budget is : {budget}</p>}
                    <input type="text" placeholder="Expense Amount" value={amount} onChange={handleExpenseAmount} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              
                    <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" style={{width:"150px"}} value={paymentmethod} label="Payment Method" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"Card"}>Card</MenuItem>
                    </Select>
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    
                    <DatePicker selected={date} onChange={handleDateChange} dateFormat="MM/dd/yyyy"/>
                    {date && (
                      <p>Selected Date: {date.toLocaleDateString()}</p>
                    )}
                    <button type="submit">Add</button>
                </form>
        </div>
    );
}