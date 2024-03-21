import React,{useEffect,useState} from "react";
import AddExpense from "./AddExpense";
//import UpdateExpense from "./UpdateExpense";
import Navbar from './Navbar';
import ExpenseList from "./ExpenseList";
import './Expense.css';
export default function Expense(){

    const [expenses, setExpenses] = useState([]);
    
   
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
            //setTotalBudget(data.totalBudget);
            //console.log(data);
            localStorage.setItem('totalBudget', data.totalBudget);
  
          }
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchBudget();
        
    }, []);

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
              setExpenses(data);
              //console.log("expense : " + data);
            }
            } catch (error) {
              console.error(error);
            }
          };
          
          fetchExpense();
          
        }, []);

    return(
        <div className="expense">
           <Navbar/>
            <div className="expense-content">
              <h1>Expenses</h1>
              <AddExpense/>
              <ExpenseList expense={expenses}/>
            </div>
        </div>
    );
}