import React, { useState } from "react";
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login () {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/inside');
      }
    } catch (error) {
      alert("Invalid email or password.");
      console.error('Error logging in', error);
    }
}

return (
    <>
    <form onSubmit={handleLogin}>
    <div className="login-header">
    <h2>Login</h2>
    <p>Welcome Back</p>
    <h6>OR</h6>
    </div>

    <div className="login-main">
    <div className="login-form">
        <label htmlFor="">Email</label>
        <input type="text" 
        id="email-name"
        value={email}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
    </div>
    </div>
    <div className="login-btn">
    <button type="submit">Login</button>
    </div>
    <p className="sign-up-redirect">Don't have an account?
        &nbsp;<span onClick={() => navigate('/signup')}>Join</span></p>
        </form>
    </>
)
}
export default Login;