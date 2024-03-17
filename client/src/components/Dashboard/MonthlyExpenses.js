import React from "react";
import './style/Dashboard.css';

export default function MonthlyExpenses({expense}){
    
    return(
        <div>
            <div>
                <div>
                {expense && expense.map((item,key)=> (
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