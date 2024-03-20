import React,{useState,useEffect} from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DashboardBudgetList from "./DashboardBudgetList";
import SummarizedGraph from "./SummarizedGraph";
import CustomCalendar from "./CustomCalendar";
import BudgetGraph from "./BudgetGraph";

import './style/Dashboard.css';

export default function Dashboard(){

    const [value, setValue] = useState('');
    const [date, setDate] = useState([]);
    const [expense, setExpense] = useState([]);
    const [budget, setBudget] = useState([]);
    const [budgetList, setBudgetList] = useState([]);
    const [budgetCategory, setBudgetCategory] = useState([]);
    const [highlightedDays,setHighlightedDays] = useState([]);
    const [totalBudget,setTotalBudget] = useState(0.0);
    const [monthyearList, setmonthyearList] = useState([]);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getMonthName(month) {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1]; // Adjust index to match conventional month numbering
    }

    useEffect(() => {
        const dateObjects = [];
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
    let f=0;
    for (let year = 2023; year <= currentYear; year++) {
        if(f){
            break;
        }
        for (let month = 1; month <= 12; month++) {
            const date =  getMonthName(month);
            dateObjects.push({ date: date, year: year });
            if(year === currentYear && month === currentMonth){
                break;
            }
        }
    }
    dateObjects.reverse();
    setmonthyearList(dateObjects);
    },[]);

    useEffect(() => {
        const retrieveData = async() =>{
            try {
                const token = localStorage.getItem('token');
                if(token){
                const response = await fetch('http://localhost:5000/expense/monthlyexpense', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ month: date.date,year:date.year }),
                });
                const data = await response.json();

                const dates = data.map(item => item.date.split('T')[0]); //// Extracting dates without time from the list
                setHighlightedDays(dates);
                setExpense(data);
                //console.log(data);
            }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if(date.date){
            retrieveData();
        }
      }, [date]);

      

    useEffect(() => {
        const retrieveBudget = async() =>{
            try {
                const token = localStorage.getItem('token');
                if(token){
                const response = await fetch('http://localhost:5000/budget/monthlybudget', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ month: date.date,year:date.year }),
                });
                const data = await response.json();

                setBudgetList(data[0].budgets);

                const budgetCategories = data[0].budgets.map(item => item.category);
                const budgets = data[0].budgets.map(item => item.amount);

                setBudget(budgets);
                setBudgetCategory(budgetCategories);
                setTotalBudget(data[0].totalBudget);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        if(date.date){
            retrieveBudget();
        }
    }, [date]);
   

    return(
        <div className="dashboard">
            <Topbar />
            <div className="scroll-month">
                <Box sx={{ maxWidth: { xs: 220, sm: 550 }, bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
                        {monthyearList && monthyearList.map((item,index) => (
                            <Tab key={index} label={item.date+' '+item.year} onClick={()=>setDate(item)}/>
                        ))}
                    </Tabs>
                </Box>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-navbar">
                    <Navbar />
                </div>
                <div className="dashboard-content">
                    <div className="dashboard-content-container">
                        <div className="all-summary-box">
                            <SummarizedGraph totalBudget={totalBudget} expense={expense}/>
                        </div>
                        <div className="calendar-box">
                            <CustomCalendar highlightedDays={highlightedDays}/>
                        </div>
                        <div className="budget-graph">
                            <BudgetGraph budgets={budget} budgetCategory={budgetCategory}/>
                        </div>
                        <div>
                            <DashboardBudgetList budgets={budgetList}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}