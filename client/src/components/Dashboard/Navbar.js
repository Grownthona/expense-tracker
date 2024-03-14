import React from 'react';
import { Navigate } from 'react-router-dom';
import logo from './images/logo_02.png';
import './Navbar.css';

export default function Navbar(){
    const handleLogout = () => {
        localStorage.removeItem('token');
        return <Navigate to="/" />;

      };
    return(
        <div>
            <div className='navbar'>
                <div className='navbar-container'>
                    <div className='logo-items'>
                        <div className='img-box'>
                            <img src={logo} alt='logo'/>
                        </div>
                    </div>
    
                    <div className='nav-items'>
                        <p><span class="icon">💵</span>Expenses</p>
                    </div>
                    <div className='nav-items'>
                        <p><span class="icon">📦</span>Catagories</p>
                    </div>
                    <button onClick={handleLogout}>
                        log out
                    </button>
                </div>
            </div>
        </div>
    )
}