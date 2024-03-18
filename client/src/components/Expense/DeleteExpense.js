import React from "react";

export default function DeleteExpense({ id }){
    const handleDelete = async() => {
        try {
            const response = await fetch('http://localhost:5000/expense/deleteexpense', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error:', error);
        }
    }
    return(
        <div>
            <button onClick={handleDelete}> Delete </button>
        </div>
    );
}