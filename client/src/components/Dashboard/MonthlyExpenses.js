import React,{useState,useEffect} from "react";
import './style/Dashboard.css';

export default function MonthlyExpenses({expense, budget}){
    
    const [totalexpense, setTotal] = useState(0.0);
    //const [totalBudget, setTotalBudget] = useState(0.0);
   
    useEffect(() => {
        //const totalBudget = localStorage.getItem('totalBudget');
        //setTotalBudget(totalBudget);
        const total = expense.reduce((acc, budget) => parseFloat(acc) + parseFloat(budget.amount), 0);
        setTotal(total);
       
      }, [expense]);
    return(
        <div>
            <div>
                <div>
                    
                <p>Total Expense : {totalexpense}</p>
                    
                {expense.length>0 && expense.map((item,key)=> (
                <li key={key}>
                  <p>Category: {item.category}</p>
                  <p>Amount: {item.amount}</p>
                  <p>paymentmethod: {item.paymentmethod}</p>
                  <p> Date : {item.date}</p>
                </li>
              ))}
                </div>
            </div>
        </div>
    );
}