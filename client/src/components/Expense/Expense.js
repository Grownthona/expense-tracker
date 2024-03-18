import React,{useEffect,useState} from "react";
import AddExpense from "./AddExpense";
import UpdateExpense from "./UpdateExpense";
import DeleteExpense from "./DeleteExpense";
export default function Expense(){

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
        <div>
            <div>
                <AddExpense/>
                {expenses && expenses.map((item,index)=>(
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