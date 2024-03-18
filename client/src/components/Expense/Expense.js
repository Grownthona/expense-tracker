import React,{useEffect,useState} from "react";
import AddExpense from "./AddExpense";
import UpdateExpense from "./UpdateExpense";
import DeleteExpense from "./DeleteExpense";
export default function Expense(){

    const [expenses, setExpenses] = useState([]);
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
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
            setTotalBudget(data.totalBudget);
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

        useEffect(() => {
          if(expenses.length>0){
            const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
            setTotalExpense(totalExpense);
          }
          
        }, [expenses]);
    return(
        <div>
            <div>
                <AddExpense/>

                <p>Total Budget : {totalBudget}</p>
                <p>Remaining : {totalBudget - totalExpense}</p>
                {expenses.length>0 && expenses.map((item,index)=>(
                   <div key={index}>
                    <p>{item.category}</p>
                    <p>{item.amount}</p>
                    <UpdateExpense id={item._id} expense={item} />
                    <DeleteExpense id={item._id} />
                    </div>
                ))}
            </div>
        </div>
    );
}