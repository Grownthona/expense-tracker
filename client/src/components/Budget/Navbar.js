import React from "react";

import { useNavigate,Link} from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
//import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from './images/logo.png'
import './Navbar.css';

export default function Sidebar(){
    const navigate = useNavigate();
    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if(token){
            localStorage.removeItem('token');
        }
        navigate("/");
      };

    return(
        <div className="sidebar">
            <header className="sidebar-header">
                <img src={logo} alt="logo" />
            </header>
            <nav>
                <Link to={'/dashboard'}>
                    <button>
                        <span>
                            <HomeOutlinedIcon />
                            <span>Dashboard</span>
                        </span>
                    </button>
                </Link>

                <Link to={'/budget'}>
                    <button>
                        <span>
                            <TocOutlinedIcon />
                            <span>Category</span>
                        </span>
                    </button>
                </Link>
                <Link to={'/expense'}>
                    <button>
                        <span>
                            <PaidOutlinedIcon />
                            <span>Expense</span>
                        </span>
                    </button>
                </Link>

                <Link to={'/trackexpense'}>
                    <button>
                        <span>
                            <AccountBalanceWalletOutlinedIcon />
                            <span>Budget Track</span>
                        </span>
                    </button>
                </Link>

                <button>
                    <span>
                        <FavoriteBorderIcon>
                            <em></em>
                        </FavoriteBorderIcon>
                        <span>Notifications</span>
                    </span>
                </button>

                <button>
                    <span>
                        <AddBoxOutlinedIcon />
                        <span>Add</span>
                    </span>
                </button>

                

                <button onClick={handleLogout}>
                    <span>
                        <LogoutIcon />
                        <span>Log Out</span>
                    </span>
                </button>
            </nav>
    </div>
    )
}