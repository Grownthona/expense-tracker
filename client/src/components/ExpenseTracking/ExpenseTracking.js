import React,{useState,useEffect} from "react";
import { PieChart ,pieArcLabelClasses} from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import ExportFile from "./ExportFile";

export default function ExpenseTracking(){
    const [expenses, setExpenses] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartDateData, setChartDateData] = useState([]);
    const [categoryFilter, setCategoryFilter] = React.useState('');
    
    const handleChange = (e) => {
      setCategoryFilter(e.target.value);
    };

    function getMonthName(month) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      return monthNames[month]; // Adjust index to match conventional month numbering
    }
    const Currentmonth = getMonthName(new Date().getMonth());
    const xLabels = [];
    for(let i=1;i<=30;i++){
      xLabels.push(Currentmonth+' '+i);
    }

    const Total = localStorage.getItem('totalBudget');
    useEffect(() => {
        const fetchExpense = async () => {
            try {
              const token = localStorage.getItem('token');
              if(token){
              const response = await fetch(`http://localhost:5000/expense/allexpenses`, {
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Bearer ${token}`
                  }
              });
              
              const data = await response.json();
             
              const dateExpenses = data.map(item => ({ date: new Date(item.date).getDate(), amount: item.amount }));
              //console.log(dateExpenses);
              const findElement = (date) => {
                return dateExpenses.find(item => item.date === date);
              };
              const uData = [];
              for(let i = 1; i<=30; i++){
                const result = findElement(i);
                if(result){
                  uData.push(parseFloat(result.amount));
                }else{
                  uData.push(0);
                }
              }
              setChartDateData(uData);
            
              const expensesWithRemaining = data.map(({ _id, __v, user, ...expense }) => ({
                ...expense,
                remaining: calculateRemaining(expense)
              }));
              const chartData = data.map(({ _id, __v, user, ...expense }) => {
                //console.log("Expense Object:", expense);
                return {
                    label: expense.category,
                    value: expense.amount
                };
              });
              setChartData(chartData);
              //console.log("Chart Data:", chartData)
             
              console.log(expensesWithRemaining);
              setExpenses(expensesWithRemaining);
            }
            } catch (error) {
              console.error(error);
            }
          };
          
          fetchExpense();
          
        }, []);

        const StyledText = styled('text')(({ theme }) => ({
          fill: theme.palette.text.primary,
          textAnchor: 'middle',
          dominantBaseline: 'central',
          fontSize: 14,
        }));

        const getArcLabel = (params) => {
          const percent = params.value / Total;
          return `${(percent * 100).toFixed(0)}%`;
        };

        function PieCenterLabel({ children }) {
          const { width, height, left, top } = useDrawingArea();
          return (
            <StyledText x={left + width/1.65} y={top + height/3}>
              {children}
            </StyledText>
          );
        }
        function PieCenterLabel2({ children }) {
          const { width, height, left, top } = useDrawingArea();
          return (
            <StyledText x={left + width/1.65} y={top + height/2.7}>
              {children}
            </StyledText>
          );
        }


        function calculateRemaining(expense) {
          const remaining = parseFloat(expense.budget) - parseFloat(expense.amount);
          return remaining;
        }
      


      return(
        <div>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={categoryFilter} label="Category" onChange={handleChange}>
              <MenuItem value={categoryFilter}>{categoryFilter}</MenuItem>
          </Select>

          <ExportFile expenses={expenses}/>
          
          {expenses && expenses.map((item,index)=>(
            <div key={index}>
              <p>{item.category}</p>
              <p>{item.budget}</p>
              <p>{item.amount}</p>
              <p>{item.remaining}</p>
            </div>
          ))}
          <PieChart
      series={[
        {
          data: chartData,
          cx: 300,
          cy: 200,
          innerRadius: 50,
          outerRadius: 100,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      width={600}
      height={600}
      slotProps={{
        legend: { hidden: false },
      }}
    >
      <PieCenterLabel>Total Budget</PieCenterLabel>
      <PieCenterLabel2>{Total}</PieCenterLabel2>
    </PieChart>

    <LineChart
      width={500}
      height={300}
      series={[
        { curve: "linear",data: chartDateData, label: "Expense", color:"orange"},
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />

        </div>
    );
}