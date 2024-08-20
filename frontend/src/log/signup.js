import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signup.css';
import Btn from "./btns.js";

function SignUp() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const namepattern = /^[A-Za-z]+$/;
    const emailpattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = () => {
        console.log('Submit button clicked');
            setTimeout(() => {
                navigate('/inside')
            }, 5100);
        };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !username || !password) {
            alert("Please fill out all the fields.");
            return;
        }

        if (!namepattern.test(firstName) || !namepattern.test(lastName)) {
            alert("First and Last names can only contain letters.");
            return;
        }
        if (!emailpattern.test(email)) {
            alert("Enter a valid email.");
            return;
        }

        const userData = { firstName, lastName, email, username, password };

        try {
            const response = await axios.post('http://localhost:8000/api/auth/signup', userData);
            if (response.status === 201) {
                const { token } = response.data;
                if(token){
                    localStorage.setItem('token', token);
                }
             
                handleSubmit();
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Error signing up.');
        }
    };

    return (
        <>
            <form onSubmit={handleSignUp}>
                <div className="signup-header">
                    <h2>Join PollErs</h2>
                </div>

                <div className="signup-name">
                    <div className="signup-group">
                        <label htmlFor="first-name">First name</label>
                        <input type="text"
                            id="first-name"
                            name="FirstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            pattern={namepattern.source}
                            title="First name can only contain letters." />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="last-name">Last name</label>
                        <input type="text"
                            id="last-name"
                            name="LastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            pattern={namepattern.source}
                            title="Last name can only contain letters." />
                    </div>
                </div>

                <div className="signup-next">
                    <label htmlFor="email-name">Email</label>
                    <input type="text"
                        id="email-name"
                        value={email}
                        name="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        pattern={emailpattern.source}
                        title="Enter a valid email." />

                    <label htmlFor="username">Username</label>
                    <input type="text"
                        id="username"
                        name="name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

               
                <div className="signup-btn">
                    <Btn onClick={handleSubmit}/>
                <p>Already have an account? <span onClick={() => navigate('/')}>Login</span></p>
                </div>
                

            </form>
        </>
    );
}

export default SignUp;
