import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    console.log(username, password);

    return (
        <div className="SignupContainer">
            <div className="SignupCard">      
                <h1>Signup</h1> 

                <div className="Input"> 
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Confirm Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button>Signup</button>

                <div className="alreadyUser">
                    <p>Already have an account?</p>
                    <Link to="/Login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
