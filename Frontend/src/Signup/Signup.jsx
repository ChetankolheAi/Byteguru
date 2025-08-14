import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { API_URL, notify } from '../utils';
function Signup() {
      const [user, setUser] = useState({
        firstname:'',
        email: '',
        password: '',
        confirmpassword: ''
      });

      const navigate = useNavigate();

      const handleClick = async () => {
        if (user.password !== user.confirmpassword) {
          notify("Confirm Password Don't Match" ,'success');
          return;
        }

        if (user.password.length < 8) {
          notify("Password To Small" ,'warning');
          return;
        }

        // Prepare user data without confirmpassword
        const userData = {
          firstname:user.firstname,
          email: user.email,
          password: user.password
        };

        try {
          const response = await fetch(`${API_URL}/api/signup`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
          });

          const result = await response.json();
        
          
    
          if (result.success == true) {
              notify(result.message , 'success')
              alert("Navigating to Login Page")
              setTimeout(() => navigate('/login'), 800);
            
          }
          else if(result.success == false){

            notify(result.message,'error')

          }
        } catch (error) {
            console.log(error)
          notify("Something Went Wrong ! Try Again Later !" ,'info');
        }
      }

    return (
        <div className="SignupContainer">
            <div className="SignupCard">      
                <h1>Signup</h1> 

                <div className="Input"> 
                    {/* <label htmlFor="firstname">FirstName</label> */}
                    <input
                        type="text"
                        id="firstname"
                        value={user.firstname}
                        placeholder="FirstName"
                        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                    />
                    {/* <label htmlFor="email1">Email</label> */}
                    <input
                        type="text"
                        id="email1"
                        value={user.email}
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    {/* <label htmlFor="password">Password</label> */}
                    <input
                        type="password"
                        id="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    {/* <label htmlFor="Confirmpassword">Confirm Password</label> */}
                    <input
                        type="password"
                        id="Confirmpassword"
                        value={user.confirmpassword}
                        placeholder="Confirm Password"
                        onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                    />
                </div>

                <button onClick={handleClick}>Signup</button>

                <div className="alreadyUser">
                    <p>Already have an account?</p>
                    <Link to="/Login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
