import React from 'react';
import { Link } from 'react-router-dom';

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
        <div>
           
            <Link to="/user/signin">
                <button>Sign In</button>
            </Link>
            <Link to="/user/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    );
}