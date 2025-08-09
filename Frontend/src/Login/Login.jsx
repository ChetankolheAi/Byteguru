import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Logging in with:', username, password);
        // Add login logic here
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Login</h1>

                <div className="login-input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={handleLogin} className="login-button">
                    Login
                </button>

                <div className="signup-section">
                    <p>New User?</p>
                    <Link to="/Signup"><i className="fa-solid fa-right-to-bracket"></i> Sign Up</Link>
                   
                </div>
            </div>
        </div>
    );
}

export default Login;
