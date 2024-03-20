import React from "react";
import { BarPlot ,BarChart } from '@mui/x-charts';
export default function BudgetGraph({budgets,budgetCategory}){
    let uData = [0, 0, 0, 0, 0, 0, 0];
    let xLabels = ['Category A','Category B','Category C','Category D','Category E','Category F','Category G',];
    if(budgets.length>0){
        uData = budgets;
        xLabels = budgetCategory;
    }
    return(
        <div>
            <BarChart colors={["orange"]} width={600} height={300} series={[{ data: uData, label: 'Budgets', type: 'bar' }]} xAxis={[{ scaleType: 'band', data: xLabels }]}>
                <BarPlot />
            </BarChart>
        </div>
    );
}