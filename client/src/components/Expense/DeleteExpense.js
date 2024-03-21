import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
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
            <span onClick={handleDelete}> <DeleteIcon/> </span>
        </div>
    );
}
