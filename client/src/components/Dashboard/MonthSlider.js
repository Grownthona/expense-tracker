import React,{useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MonthlyExpenses from './MonthlyExpenses';

const MonthSlider = () => {

  const [date, setDate] = useState('');
  const [expense, setExpense] = useState([]);
  const [budget, setBudget] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to match conventional month numbering
  //const currentYear = currentDate.getFullYear();

  const months = [];
  for (let i = currentMonth; i >=1; i--) {
    months.push(getMonthName(i));
  }

  function getMonthName(month) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month - 1]; // Adjust index to match conventional month numbering
  }
  const handleChange = async(event) => {
    const selectedMonth = event.target.value;
    setDate(selectedMonth); 

    console.log(selectedMonth);
    
    try {
      const token = localStorage.getItem('token');
      if(token){
      const response = await fetch('http://localhost:5000/expense/monthlyexpense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ selectedMonth }),
      });
      const data = await response.json();
      setExpense(data);
      //console.log(data);
    }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const token = localStorage.getItem('token');
      if(token){
      const response = await fetch('http://localhost:5000/budget/monthlybudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ selectedMonth }),
      });
      const data = await response.json();  
      setBudget(data);
      //console.log(data[0].totalBudget);
    }
    } catch (error) {
      console.error('Error:', error);
    }
  
  };


  return (
    <div>
      <Box sx={{ maxWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Month"
            onChange={handleChange}>
            {months.map((month, index) => (
                <MenuItem key={index} value={month}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <p>{date}</p>
      <div>
        {budget.length>0 ? 
        <MonthlyExpenses expense={expense} budget={budget[0]}/>
      :
      <MonthlyExpenses expense={expense}/>
      }
      </div>
    </div>
  );
};

export default MonthSlider;
