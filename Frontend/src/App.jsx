import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer , Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Pages/Chatpage';
import SideBar from './SideBar/SideBar';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import History from './History/History'
import AboutUs from './AboutUs/AboutUs';
import Navbar from './Navbar/navbar';
import Ide from './Ide/Ide'
import { API_URL } from "./utils";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userid, setuserid] = useState("");
  const [firstname, srtFirstname] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setuserid("");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setuserid("");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setuserid(data.user._id);
        srtFirstname(data.user.firstname);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  fetchUser();
  window.addEventListener("storage", fetchUser);

  return () => window.removeEventListener("storage", fetchUser);
}, []);

  return (
    <Router>
      <SideBar isOpen={isSidebarOpen} 
      
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div
       style={{
        marginLeft:
          window.innerWidth > 1000 ? (isSidebarOpen ? '200px' : '0') : '0',
        transition: 'margin-left 0.3s ease',
      }}

      >
        <Navbar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
          <ToastContainer transition={Slide} /> 
      
        <Routes>
          <Route path="/" element={<Home userid={userid} firstname={firstname}/>} />
          <Route path="/Home" element={<Home  userid={userid}/>} />
          <Route path="/History" element={<History userid={userid} isAuthenticated={isAuthenticated} />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Ide" element={<Ide />} />
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
