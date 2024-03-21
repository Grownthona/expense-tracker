import React, { useState ,useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import Box from '@mui/material/Box';

import 'react-datepicker/dist/react-datepicker.css';


export default function AddExpense(){
    const [open, setOpen] = useState(false);
    //const [budget, setBudgets] = useState([]);
    const [budgetlist, setBudgetsList] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState(' ');
    const [paymentmethod, setPaymentMethod] = useState('');
    const [location, setLocation] = useState(' ');
    const [user,setUser] = useState('');
  
    const [categoryAmountDict, setCategoryAmountDict] = useState({});
    const [budget, setCategoryBudget] = useState(0.0);
   // const [date, setSelectedDate] = useState(null);

  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  
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

   

    const handleSubmit = async() =>{
      if(amount>0.0 && category !== ''){
       const date = new Date();
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
        if(response.status()=== 404){
          alert(data);
        }
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
        <button className="button-37" onClick={handleClickOpen} style={{marginTop:"3rem"}} role="button">Add Expense</button>
          <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 0,width: '90%',height:'100%' ,borderRadius: '16px' } }} maxWidth="xs">
            
              <div className="form-box">
                <div className="form-box-container">
                    <Box sx={{ minWidth: 150 ,height:450}}>
                      <h3>Add Expense</h3>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel id="demo-simple-select-standard-label" style={{marginTop:"1rem"}}>Category</InputLabel>
                        <Select fullWidth labelId="demo-simple-select-standard-label" id="demo-simple-select" style={{marginTop:"4rem"}} value={category} label="Category" onChange={handleCategoryChange}>
                          {budgetlist.map((budget, index) => (
                            <MenuItem key={index} value={budget.category}>{budget.category}</MenuItem>
                          ))};
                        </Select>
                        <TextField id="standard-basic" style={{marginTop:"1rem"}} label="Expense Amount" variant="standard" value={amount} onChange={handleExpenseAmount}/>
                        <TextField id="standard-basic" style={{marginTop:"1rem"}}  label="Description" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)}/>
                          <Select fullWidth labelId="demo-simple-select-label" style={{marginTop:"2rem"}} id="demo-simple-select" value={paymentmethod} label="Payment Method" onChange={(e) => setPaymentMethod(e.target.value)}>
                            <MenuItem value={"Cash"}>Cash</MenuItem>
                            <MenuItem value={"Card"}>Card</MenuItem>
                          </Select>
                        <TextField id="standard-basic" label="Location" variant="standard" style={{marginTop:"1rem"}} value={location} onChange={(e) => setLocation(e.target.value)} />
                        <button className="button-37" onClick={handleSubmit} style={{marginTop:"2rem"}} role="button">Save</button>
                      </FormControl>
                    </Box>
                </div>
              </div>
          </Dialog>
      </div>
    );
}