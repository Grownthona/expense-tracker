import React from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
//import MonthSlider from "./MonthSlider";
import './style/Dashboard.css';
export default function Dashboard(){
    return(
        <div className="dashboard">
            <Topbar/>
            <div className="dashboard-container">
                <div className="dashboard-navbar">
                    <Navbar/>
                </div>
                
            </div>
        </div>
    );
}