import React,{useState,useEffect} from "react";
export default function ExpenseTracking(){
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
              const token = localStorage.getItem('token');
              if(token){
              const response = await fetch(`http://localhost:5000/expense`, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                  }
              });
              const data = await response.json();
              const expensesWithRemaining = data.map(expense => ({
                ...expense,
                remaining: calculateRemaining(expense)
              }));
            
              setExpenses(expensesWithRemaining);
            }
            } catch (error) {
              console.error(error);
            }
          };
          
          fetchExpense();
          
        }, []);

        function calculateRemaining(expense) {
          const remaining = parseFloat(expense.budget) - parseFloat(expense.amount);
          return remaining;
        }
      return(
        <div>
          {expenses && expenses.map((item,index)=>(
            <div key={index}>
              <p>{item.category}</p>
              <p>{item.budget}</p>
              <p>{item.amount}</p>
              <p>{item.remaining}</p>
            </div>
          ))}
        </div>
    );
}