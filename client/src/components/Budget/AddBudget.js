import React from 'react';
import { useState ,useEffect} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';

import './Budget.css';
export default function AddBudget({id,category,total,budget,currentamount}){

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(currentamount);
    const [totalBud,setTotal] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0.0);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
      const total = budget.budgets.reduce((acc, budget) => acc + budget.amount, 0);
      setTotalBudget(total);
    }, [budget]);
  
    const handleTotal = async() => {
        //e.preventDefault();
        // Alert the totalBudget value of the first budget item after updating
        budget.totalBudget = totalBud;
        try {
            const token = localStorage.getItem('token');
           
            const response = await fetch('http://localhost:5000/budget/addbudget', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },

              body: JSON.stringify({ budget }),
            });
            //const data = await response.json();

            alert("Budget Added");
            window.location.reload();
          } catch (error) {
            console.error('Error:', error);
        }
    }
    
    const handleSubmit = async() => {
      //e.preventDefault();
      // checking if newly added budget will exceed the total budget or not
      let x = parseFloat(totalBudget);
      let y = parseFloat(amount);
      let z = parseFloat(total);
      let a = parseFloat(currentamount);
      if(a>0){
        x -= a;
      }

        if(x + y <= z){ 
        const updatedBudgets = budget.budgets.map(item => {
            if (item._id === id) {
                return { ...item, amount: amount };
            }
            return item;
        });

        const updatedBudget = { ...budget, budgets: updatedBudgets };
        budget = updatedBudget;

        try {
            const response = await fetch('http://localhost:5000/budget/addbudget', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ budget }),
            });
            const data = await response.json();
            //alert(data);
            //console.log(data);
            window.location.reload();
          } catch (error) {
            console.error('Error:', error);
        }
      } else {
        
        alert("You're exceeding the current monthly budget");
      }
      
    }

    return(
        <div>   
          <span onClick={handleClickOpen}  style={{marginTop:"-10px",cursor:"pointer"}}><EditIcon/></span>
          <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 10,width: '40%',height:'70%' ,borderRadius: '16px' } }} maxWidth="xs">
          {total > 0 ? //when user has defined total budget
            <div className='add-budget-form'>
              <div className='add-budget-form-container'>
                <h2 style={{textAlign:"center"}}>Add Budget</h2>
                <TextField fullWidth id="standard-basic" style={{ marginTop: "2rem" }} value={category} label="Category" variant="standard" />
                <TextField fullWidth id="standard-basic" style={{ marginTop: "2rem" }} variant="standard" label="Budget Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button className="button-37" style={{ marginTop: "2rem",width:"100%" }} onClick={handleSubmit} role="button">Add</button>
              </div>
            </div>
            :
            <div className='add-budget-form'>
              <div className='add-budget-form-container'>
                  <h2 style={{textAlign:"center"}}>Please add the monthlu budget</h2>
                  <TextField fullWidth id="standard-basic" label="Total Budget" style={{marginTop:"2rem"}} variant="standard" value={totalBud} onChange={(e) => setTotal(e.target.value)} />
                  <button className="button-37" style={{marginTop:"2rem",marginLeft:"1rem"}} onClick={handleTotal} role="button">Save</button>
              </div>
            </div>
          }
          </Dialog>
        </div>
    )
}