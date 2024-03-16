import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';


export default function AddBudget({id,category,total,budget}){

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [totalBud,setTotal] = useState(0);
   

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleTotal = async() => {
        budget.totalBudget = totalBud;
        try {
            const response = await fetch('http://localhost:5000/budget/addbudget', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',

              },
              body: JSON.stringify({ budget }),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleSubmit = async() => {

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
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
        }
    }

    return(
    <div style={{width:"100%",height:"100%"}}>   
    <button onClick={handleClickOpen}>Add</button>
    <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 0,width: '40%',height:'60%' ,borderRadius: '16px' } }} maxWidth="xs">
        {total > 0 ? 
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Category Name" value={category} readOnly={category}/>
        <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button type="submit">Add</button>
        </form>
        :
        <div>
            <h2>Please add the total Price First</h2>
            <form onSubmit={handleTotal}>
                <input type="text" placeholder="Total Budget" value={totalBud} onChange={(e) => setTotal(e.target.value)}/>
                <button type="submit">Save</button>
            </form>
        </div>
        }
    </Dialog>
    </div>
    )
}