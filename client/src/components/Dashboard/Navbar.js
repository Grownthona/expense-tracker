import './Navbar.css';
import logo from './images/logo_02.png';
import React from 'react';
export default function Navbar(){

    return(
        <div>
            <div className='navbar'>
                <div className='navbar-container'>
                    <div className='logo-items'>
                        <div className='img-box'>
                            <img src={logo} alt='logo'/>
                            <h5>guni</h5>
                        </div>
                    </div>
    
                    <div className='nav-items'>
                        <p><span class="icon">💵</span>Expenses</p>
                    </div>
                    <div className='nav-items'>
                        <p><span class="icon">📦</span>Catagories</p>
                    </div>
                </div>
            </div>
        </div>
    )
}