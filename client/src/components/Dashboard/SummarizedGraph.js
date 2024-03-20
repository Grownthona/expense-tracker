import React,{useState,useEffect} from "react";

import { PieChart ,pieArcLabelClasses} from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

//import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import './style/SummaryGraph.css';
import imgdollar from './images/expensive_price_30.png'

export default function SummarizedGraph({totalBudget,expense}){
  const Total = totalBudget;
  const [totalExpense,setTotalExpense] = useState(0.0);
  useEffect(() => {
    if(expense.length>0){
      const totalExpense = expense.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalExpense(totalExpense);
      console.log(totalExpense);
    }
  
    
  }, [expense]);

    const data2 = [
        { label: 'Expense', value: totalExpense },
        { label: 'Remaining', value: Total-totalExpense },
      ];
      const StyledText = styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 14,
      }));


      function PieCenterLabel({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width/2.50} y={top + height/3} fontWeight={"bold"} fontSize={"55"}>
            {children}
          </StyledText>
        );
      }
      function PieCenterLabel2({ children }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width/2.50} y={top + height/2} fontWeight={"bold"}>
            {children}
          </StyledText>
        );
      }


    return (
        <div className="summary-chart">
            <div className="summary-chart-container">
                <div style={{marginTop:"3rem"}}>
                    <PieChart 
                      colors={['#eeeeee', 'orange']}
                        series={[
                            {
                              data: data2,
                              cx: 95,
                              cy: 100,
                              innerRadius: 65,
                              outerRadius: 100,
                              //arcLabel: getArcLabel,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontWeight: 'normal',
                            },
                        }}
                        width={350}
                        height={250}
                        
                        slotProps={{
                            legend: { hidden: false },
                        }}
                    >
                        <PieCenterLabel>Remaining</PieCenterLabel>
                        <PieCenterLabel2>{((Total-totalExpense)/Total)*100} %</PieCenterLabel2>
                    </PieChart>
                </div>
                <div>
                    <div>
                        <div className="chart-summary-text">
                        <img src={imgdollar} alt="dollar"/>
                            <h3>Remaining Budget</h3>
                            <h2 style={{color:"orange"}}>$ {Total - totalExpense}</h2>
                        </div>
                        <div className="chart-summary-text-another">
                            <h4>Total Budget  : $ {Total}</h4>
                            <h4>Total Expense : $ {totalExpense}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}