import React,{useState} from "react";
import Dialog from '@mui/material/Dialog';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './Expense';

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
        <span onClick={handleClickOpen}><EditIcon/></span>
        <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper':{m: 0, p: 0,width: '90%',height:'100%' ,borderRadius: '16px' } }} maxWidth="xs">
        <div className="form-box">
                <div className="form-box-container">
                    <Box sx={{ minWidth: 150 ,height:450}}>
                      <h3>Update Expense</h3>
                      <FormControl variant="standard" fullWidth>
                        <TextField id="standard-basic" style={{marginTop:"1rem"}} label="Category" variant="standard" value={expense.category}/>
                        <TextField id="standard-basic" style={{marginTop:"1rem"}} label="Expense Amount" variant="standard" value={amount} onChange={handleExpenseAmount}/>
                        <TextField id="standard-basic" style={{marginTop:"1rem"}}  label="Description" variant="standard" value={description} onChange={(e) => setDescription(e.target.value)}/>
                          <Select fullWidth labelId="demo-simple-select-label" style={{marginTop:"2rem"}} id="demo-simple-select" value={paymentmethod} label="Payment Method" onChange={(e) => setPaymentMethod(e.target.value)}>
                            <MenuItem value={"Cash"}>Cash</MenuItem>
                            <MenuItem value={"Card"}>Card</MenuItem>
                          </Select>
                        <TextField id="standard-basic" label="Location" variant="standard" style={{marginTop:"1rem"}} value={location} onChange={(e) => setLocation(e.target.value)} />
                        <button className="button-37" onClick={handleUpdate} style={{marginTop:"2rem"}} role="button">Save</button>
                      </FormControl>
                    </Box>
                </div>
              </div>
        </Dialog>
      </div>
    );
}