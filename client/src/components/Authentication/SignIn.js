import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom';
import img1 from './productivity.png';
import back from './back.png';
import Box from '@mui/material/Box';

import './styles/Authetication_style.css';

export default function SignIn(){
    

    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const check = localStorage.getItem('token');
      if(check){
        navigate("/dashboard");
      }
    }, [navigate]);

    const handleLogin = async (e) => {
      //e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.status === 200) {
          
            localStorage.setItem('token', data.token); // Store token in localStorage
            console.log(data.token);
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error(error);
    }
    };
    

    return (
    <div>
        <div className='authentication'>
        <Link to={'/'}><img id='back' src={back} alt='back'/></Link>
        <div className='authentication-container'>
        
          <div className='auth-imge-box'>
            <img src={img1} alt='background' />
          </div>
          <div className='auth-form-box'>
            <Box component="form" height={570} width={500} m={4} gap={4} p={10} sx={{ border: '1px solid rgb(226, 226, 226)' , boxShadow: '7px 10px 7px 10px rgb(231, 231, 231)'}}>
                <h3 style={{marginBottom:'3rem',textAlign:'center',fontSize:'35px'}}>Sign In</h3>
                  <TextField fullWidth sx={{mb:2}} id="standard-basic" placeholder='Enter Your Email Address' type='email' label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <TextField fullWidth sx={{mb:2}} id="standard-basic2" placeholder='Enter Your Password' type='password' label="Password" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='button-66' onClick={handleLogin}>Sign In</button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}