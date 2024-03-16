import React from 'react';
import { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';

export default function AddNewCategory({ user ,monthlyBudget , spendingBudget}){
    const [open, setOpen] = useState(false);
    const [category,setCategory] = useState('');
    const [amount,setAmount] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async() => {
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
            console.log(data);
           } catch (error) {
            console.error('Error:', error);
        }
    }else{
        alert("Your current budget will exceed to Total Budget Amount");
    }
    }
    return(
        <div>
            <Button onClick={handleClickOpen}>Add New Category</Button>
            <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 0,width: '40%',height:'60%' ,borderRadius: '16px' } }} maxWidth="xs">
            <div>
                <h2>Please add the total Price First</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                    <input type="text" placeholder="Budget Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                    <button type="submit">Save</button>
                </form>
            </div>
            </Dialog>
        </div>
    );
}