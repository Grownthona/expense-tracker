import React,{ useState } from "react";
import { Navigate } from "react-router-dom";
export default function SignIn(){
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleLogin = async (e) => {
        e.preventDefault();

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
            return <Navigate to="/" />;
        } else {
            alert(data.message); // Show error message
        }
    } catch (error) {
        console.error(error);
    }
    };

    return (
    <div>
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
  );
}