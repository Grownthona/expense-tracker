import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import './Budget.css'
import BudgetList from './BudgetList';
function Budget() {
  const [budget, setBudgets] = useState([]);
  const [budgetlist, setBudgetsList] = useState([]);
  
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


  if(!budget){
    return <p>No budgets available</p>;
  }

  return (

    <div className='budget'>
      <Navbar/>
      <div className='budget-content'>
        <h1>Categories</h1>
        <div className='budget-table'>
          <BudgetList budget={budget} budgetlist={budgetlist}/>
        </div>
      </div>
    </div>
  );
}

export default Budget;
