import React from 'react';
import { Link } from 'react-router-dom';
import './style/Home.css';
import img1 from './images/manage-money-concept.jpg'
export default function Home(){
    /*const [loggedIn, setLoggedIn] = useState(false);
    const handleLogin = () => {
        setLoggedIn(true);
      };
      
    
      const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
      };*/
    
    return(
        <div className='Home'>
            <div className='home-container'>
                <div className='content-box'>
                    <div className='content-box-text'>
                        <h1>Start Your Financial Journey Right Now!</h1>
                        <p>By meticulously managing your income and expenses, you can gain control over your finances and work towards achieving your financial goals. </p>
                        <div className='button-box'>
                            <div className='button-box-container'>
                                <div className='button-content'>
                                    <Link to="/user/signin">
                                        <button className='button-58'>Login</button>
                                    </Link>
                                </div>
                                <div className='button-content'>
                                    <Link to="/user/signup">
                                        <button className='button-58'>Sign Up</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               <div className='imge-box'>
                    <div className='imge-container'>
                        <img src={img1} alt='homeimage'/>
                    </div>
               </div>
            </div>
        </div>
    );
}