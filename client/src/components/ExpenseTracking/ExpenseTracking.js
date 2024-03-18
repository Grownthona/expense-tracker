import React,{useState,useEffect} from "react";
export default function ExpenseTracking(){
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
              const token = localStorage.getItem('token');
              if(token){
              const response = await fetch(`http://localhost:5000/allexpenses`, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                  }
              });
              const data = await response.json();
              const expensesWithRemaining = data.map(({ _id, __v, user, ...expense }) => ({
                ...expense,
                remaining: calculateRemaining(expense)
              }));
              console.log(expensesWithRemaining);
              setExpenses(expensesWithRemaining);
            }
            } catch (error) {
              console.error(error);
            }
          };
          
          fetchExpense();
          
        }, []);

        function downloadCSV(csvContent) {
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'expenses.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }

        function convertToCSV(data) {
          let csv = 'amount,budget,category,date,description,location,month,paymentmethod,remaining,user,year\n';
      
          data.forEach(item => {
            const {
              amount,
              budget,
              category,
              date,
              description,
              location,
              month,
              paymentmethod,
              remaining,
              user,
              year
            } = item;
      
            const formattedDate = new Date(date).toISOString().split('T')[0];
            const line = `${amount},${budget},${category},"${formattedDate}","${description}","${location}",${month},"${paymentmethod}",${remaining},"${user}",${year}\n`;
            csv += line;
          });
      
          return csv;
        }

        function calculateRemaining(expense) {
          const remaining = parseFloat(expense.budget) - parseFloat(expense.amount);
          return remaining;
        }
        const handleDownloadClick = () => {
        
          const csvContent = convertToCSV(expenses);
          downloadCSV(csvContent);
        }
      return(
        <div>
          <button onClick={handleDownloadClick}>Download CSV</button>
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