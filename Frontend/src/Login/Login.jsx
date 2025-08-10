import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { BACKEND_URL,API_URL, notify } from '../utils';
function Login() {
   
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

      const navigate = useNavigate(); // For navigation after login

  const  handleSubmit = async (e)=> {
     e.preventDefault()// Prevent page reload
    
    
    try{
      const url =`${BACKEND_URL}/api/login`;
      const response = await fetch(url, {
    
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })
    const result = await response.json();
    console.log(result.message)

    const {message ,jwtToken,username,email,_id}= result;
    

    if(result.success == true){

        console.log(message)
        
        notify(message ,'success');
        
        localStorage.setItem('token',jwtToken);
        localStorage.setItem("userId", _id);
        localStorage.setItem("email", email);
        localStorage.setItem('loggedInUser',username);
        window.dispatchEvent(new Event('storage'));
        console.log("Token set in localStorage:", localStorage.getItem('token'));
        
        console.log("Navigating to Home Page");
          
        alert("Navigating to Home Page")
        setTimeout(() => navigate('/'), 500);

    }else if(result.success == false){
      
      notify(message ,'error');
      console.log("Someting Went Wrong ! Try Again")

    }
  } catch (error) {
       console.error(error);
       notify("Something Went Wrong ! Try Again Later !" ,'info');
      
  }

}

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Login</h1>

                <div className="login-input-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        id="username"
                        value={user.email}
                        placeholder="Enter your Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        placeholder="Enter your password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <button onClick={handleSubmit} className="login-button">
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
