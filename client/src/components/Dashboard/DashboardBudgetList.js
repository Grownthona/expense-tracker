import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


/*function getRandomColor() {
    // Generate random values for red, green, and blue channels
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    
    // Construct the RGB color string
    var color = 'rgb(' + r + ',' + g + ',' + b + ')';
    
    return color;
}*/
export default function DashboardBudgetList({ budgets}) {
  let filteredLists = budgets.filter(lst => lst.amount > 0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h3>Category</h3></TableCell>
        
            <TableCell align="right"><h3>Budget&nbsp;(৳)</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredLists.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.category}</TableCell>
            
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}