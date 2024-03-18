import React,{useState} from "react";
import Dialog from '@mui/material/Dialog';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

/*import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

*/

export default function UpdateExpense({id,expense}){
  
const [amount, setAmount] = useState(expense.amount);
const [description, setDescription] = useState(expense.description);
const [paymentmethod, setPaymentMethod] = useState(expense.paymentmethod);
const [location, setLocation] = useState(expense.location);



/*const handleDateChange = date => {
  setSelectedDate(date);
};
*/
  const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleUpdate = async() => {
        //console.log(expens);
        
        const user = expense.user;
        const category = expense.category;
        const budget = expense.budget;
        const date = expense.date;
        
        try {
            const response = await fetch('http://localhost:5000/expense/updateexpense', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id, user, category, amount,budget, description, paymentmethod, location, date }),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleExpenseAmount = (e) => {
      
      const expenseCost = e.target.value;
      
      if(parseFloat(expenseCost)>parseFloat(expense.budget)){
        alert("you're exceeding the current budget value to expense");
      }else{
        setAmount(e.target.value);
      }
    }

    
    return(
      <div>
        <button onClick={handleClickOpen}>Update</button>
        <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { m: 0, p: 0, width: '40%', height: '60%', borderRadius: '16px' } }} maxWidth="xs">
          <form onSubmit={handleUpdate}>
        
               <input type="text" placeholder="Expense Amount" value={expense.category} readOnly={expense.category} />
                    <input type="text" placeholder="Expense Amount" value={amount} onChange={handleExpenseAmount} />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" style={{width:"150px"}} value={paymentmethod} label="Payment Method" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <MenuItem value={"Cash"}>Cash</MenuItem>
                        <MenuItem value={"Card"}>Card</MenuItem>
                    </Select>
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <p>Date : {expense.date}</p>
                    
            <button type="submit">Add</button>
          </form>
        </Dialog>
      </div>
    );
}