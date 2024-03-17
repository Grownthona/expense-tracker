import React from "react";
import Navbar from "./Navbar";
import MonthSlider from "./MonthSlider";
import './style/Dashboard.css';
export default function Dashboard(){
    return(
        <div className="dashboard">
            <div className="dashboard-container">
                <div className="dashboard-navbar">
                    <Navbar/>
                </div>
                <div className="dashboard-board">
                    <MonthSlider/>
                </div>
            </div>
        </div>
    );
}