import React, { useEffect, useState } from 'react';
import AddBudget from './AddBudget';
import AddNewCategory from './AddNewCategory';

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
          console.log(data);
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
    <div>
      {budget && <AddNewCategory user={budget.user}/>}
      <h2>Budget List</h2>
      <ul>
        {budget && (
          <li key={budget._id}>
            <p>Total Budget: {budget.totalBudget}</p>
            <p>Date: {budget.date}</p>
            <ul>
              {budgetlist.map((item,key)=> (
                <li key={key}>
                  <p>Category: {item.category}</p>
                  <p>Amount: {item.amount}</p>
                  <AddBudget id={item._id} category={item.category} total={budget.totalBudget} budget={budget}/>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Budget;
