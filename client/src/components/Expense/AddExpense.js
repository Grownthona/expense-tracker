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
  
    //const [categoryAmountDict, setCategoryAmountDict] = useState({});

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
          
          setUser(data.user);
          //setBudgets(data);
        }
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchBudget();
      
    }, []);


    // Call the function to populate the dictionary when the component mounts
    /*useEffect(() => {
      populateCategoryAmountDict();
    }, []); 

    const populateCategoryAmountDict = () => {
      const dict = {};
      budgetlist.forEach(item => {
          dict[item.category] = item.amount;
      });
      setCategoryAmountDict(dict);
    };
    */

    const handleSubmit = async() =>{
      try {
        const response = await fetch('http://localhost:5000/expense/addexpense', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, category, amount, description, paymentmethod, location, date }),
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
    }
    }
    return(
        <div>
            <Button>Add Expense</Button>
            <p>{user}</p>
                <form onSubmit={handleSubmit}>
                  
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" style={{width:"150px"}} value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                      {budgetlist.map((budget, index) => (
                        <MenuItem key={index} value={budget.category}>{budget.category}</MenuItem>
                      ))}
                      
                    </Select>
                    

                    <input type="text" placeholder="Expense Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="Payment Method" value={paymentmethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
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