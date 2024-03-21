import React from "react";
import { Link } from "react-router-dom";
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './style/Topbar.css';

export default function Topbar(){
    return(
        <div>
            <div className="navbar">
                <div className="navbar-links">
                    <Badge color="secondary" variant="dot"><NotificationsIcon /></Badge>
                </div>
            </div>
        </div>
    );
}