import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Budget.css';

export default function AddNewCategory({ user ,monthlyBudget , spendingBudget}){
    const [open, setOpen] = useState(false);
    const [category,setCategory] = useState(' ');
    const [amount,setAmount] = useState(' ');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        let monthly = parseFloat(monthlyBudget);
        let spending = parseFloat(spendingBudget);
        let newAmount = parseFloat(amount);

        if(spending +newAmount <= monthly){
        try {
            const response = await fetch('http://localhost:5000/budget/addnewcategory', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user, category, amount }),
            });
            const data = await response.json();
            alert(data);
            //setOpen(false);
           } catch (error) {
            console.error('Error:', error);
        }
    }else{
        alert("Your current budget will exceed to Total Budget Amount. Your remaining ");
    }
    }
    return(
        <div>
            <button className="button-37" onClick={handleClickOpen} role="button">Add New Category</button>
            <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 10,width: '40%',height:'70%' ,borderRadius: '16px' } }} maxWidth="xs">
                    <form onSubmit={handleSubmit}>
                    <h3>Please Enter the Information</h3>
                    <TextField fullWidth id="standard-basic" label="Category" variant="standard" style={{marginTop:"2rem"}} value={category} onChange={(e) => setCategory(e.target.value)}/>
                    <TextField id="standard-basic" label="Budget Amount" variant="standard" style={{marginTop:"2rem"}} value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <button className="button-37" style={{marginTop:"2rem"}} type='submit'>Save</button>
                    </form>
            </Dialog>
        </div>
    );
}