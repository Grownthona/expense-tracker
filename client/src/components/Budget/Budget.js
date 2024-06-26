import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import './Budget.css'
import BudgetList from './BudgetList';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function Budget() {
  const [budget, setBudgets] = useState([]);
  const [budgetlist, setBudgetsList] = useState([]);
  const [open, setOpen] = React.useState(false);
  
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
          //console.log(data);
          setBudgets(data);

        }
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchBudget();
      
  }, []);

  useEffect(() => {
  if(!budget){
    setOpen(true);
    return(
      <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
      </Backdrop>

      </div>
    );
  }else{
    setOpen(false);
  }
}, [budget,open]);

  return (
    <div className='budget'>
      <Navbar/>
      <div className='budget-content'>
        <h1>Categories</h1>
        <div className='budget-table'>
          { budgetlist && <BudgetList budget={budget} budgetlist={budgetlist}/>}
        </div>
      </div>
    </div>
  );
}

export default Budget;
