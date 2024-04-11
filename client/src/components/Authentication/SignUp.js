import React, { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import img1 from './productivity.png';
import back from './back.png';
import Box from '@mui/material/Box';

import './styles/Authetication_style.css';


export default function SignUp(){
    const navigate = useNavigate();
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(' ');
   
    //const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const handleUserName = (event) => {
      const emailValue = event.target.value;
      setEmail(emailValue);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(emailValue));
    };

    useEffect(() => {
      if(isLoggedIn){
        navigate("/user/signin/");
      }
    }, [isLoggedIn,navigate]);
    
    const handleSignup = async (e) => {
        //e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if(email === '' || emailRegex.test(email)===false){
          return alert('Invalid Email');
        }
        if(username === ''){
          return alert('Enter Username');
        }
        if(password === ''){
          return alert('Enter Password');
        }
        try {
          const response = await fetch('http://localhost:5000/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
          });
          const data = await response.json();
          if (response.status === 200) {
            //alert('User created successfully');
            navigate("/user/signin/");
            setLoggedIn(true);
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert(error);
        }
    };
   
    const handlePassWord = (e) =>{
      const pass = e.target.value;
      setPassword(e.target.value);
      if(pass.length <6){
        setIsValidPassword(false);
      }else{
        setIsValidPassword(true);
      }
    }
    return( 
      <div className='authentication'>
        <Link to={'/'}><img id='back' src={back} alt='back'/></Link>
        <div className='authentication-container'>
          
          <div className='auth-imge-box'>
            <img src={img1} alt='background' />
          </div>
          <div className='auth-form-box'>
            <Box component="form" height={570} width={500} m={4} gap={4} p={10} sx={{ border: '1px solid rgb(226, 226, 226)' , boxShadow: '7px 10px 7px 10px rgb(231, 231, 231)'}}>
           
                <h3 style={{marginBottom:'3rem',textAlign:'center',fontSize:'35px'}}>Sign Up</h3>
                
                {isValid ?
                    <TextField fullWidth sx={{mb:2}} id="standard-basic" placeholder='Enter Your Email Address' type='email' label="Email" variant="standard" value={email} onChange={handleUserName}/>
                :
                    <TextField fullWidth sx={{mb:2}} error id="standard-basic" placeholder='Enter Your Email Address' type='email' label="Email" variant="standard" value={email} onChange={handleUserName}/>
                }
                <TextField fullWidth sx={{mb:2}} id="standard-basic" placeholder='Enter Your Username' label="Username" variant="standard"  value={username} onChange={(e) => setUsername(e.target.value)}/>
                {isValidPassword ?
                    <TextField fullWidth sx={{mb:2}} id="standard-basic" placeholder='Enter Your Password' type='password' label="Password" variant="standard" value={password} onChange={handlePassWord}/>
                :
                    <TextField fullWidth error sx={{mb:2}} id="standard-basic" placeholder='Enter Your Password' type='password' label="Password" variant="standard" value={password} onChange={handlePassWord}/>
                }
                
                <button className='button-66' onClick={handleSignup}>Sign Up</button>
            </Box>
          </div>
        </div>
      </div>
    );
}