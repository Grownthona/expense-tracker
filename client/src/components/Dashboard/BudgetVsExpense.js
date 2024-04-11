import React from "react";
import { BarPlot ,BarChart } from '@mui/x-charts';

let uData = [0, 0, 0, 0, 0, 0, 0];
let pData =  [0, 0, 0, 0, 0, 0, 0];
let xLabels = ['Category A','Category B','Category C','Category D','Category E','Category F','Category G',];

export default function BudgetVsExpense({budgets,budgetCategory,expense}){
    //useEffect(() => {
        
        if(budgets.length>0 && expense.length>0){
            uData = budgets;
            xLabels = budgetCategory;
            let temp=[];
            for(let i=0;i<xLabels.length;i++){
                let categoryName = xLabels[i];
                const filteredData = expense.filter(expense => expense.category === categoryName);
                if(filteredData.length >0 && filteredData[0].category === categoryName){
                    temp.push(filteredData[0].amount);
                }else{
                    temp.push(0);
                }
            }
            pData = temp;
            //console.log(temp);
        }
   // },[expense,budgetCategory,budgets]);
    
    return(
        <div>
            <BarChart colors={["black","orange"]} width={700} height={300} series={[{ data: uData, label: 'Budgets', type: 'bar' },{ data: pData, label: 'Expenses', id: 'uvId' },]} xAxis={[{ scaleType: 'band', data: xLabels }]}>
                <BarPlot />
            </BarChart>
            <p style={{textAlign:"center"}}>Budget Vs Expense</p>
        </div>
    );
}