import React,{useState,useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from './images/logo_02.png';
import './Navbar.css';


export default function Navbar(){
    const [decodedToken, setDecodedToken] = useState(null);

    const decodeToken = (token) => {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded.userId);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
          decodeToken(token);
        }
      }, []); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        return <Navigate to="/user/signin" />;

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
                    <div>
                        <p>{decodedToken}</p>
                    </div>
                    <button onClick={handleLogout}>
                        log out
                    </button>
                </div>
            </div>
        </div>
    )
}