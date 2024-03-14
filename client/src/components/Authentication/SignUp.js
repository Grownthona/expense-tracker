import React, { useState } from 'react';
export default function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const handleSignup = async () => {
        try {
          const response = await fetch('http://localhost:5000/user/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password }),
          });
    
          if (response.status === 201) {
            console.log('User created successfully');
          } else {
            console.log('Error creating user');
          }
        } catch (error) {
          console.error(error);
        }
    };

    return(
        
        <div>
            Sign up
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}