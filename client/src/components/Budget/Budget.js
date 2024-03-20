import React, { useEffect, useState } from 'react';
import AddBudget from './AddBudget';
import AddNewCategory from './AddNewCategory';
import Navbar from "./Navbar";
function Budget() {
  const [budget, setBudgets] = useState([]);
  const [budgetlist, setBudgetsList] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0.0);
  
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
          console.log(data);
          setBudgets(data);

        }
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchBudget();
      
  }, []);

  useEffect(() => {

    const total = budgetlist.reduce((acc, budget) => acc + budget.amount, 0);
    setTotalBudget(total);
  }, [budgetlist]);



  if(!budget){
    return <p>No budgets available</p>;
  }

  return (

    <div className='budget'>
      <Navbar/>
    </div>
  );
}

export default Budget;
