import React, { useState } from 'react';
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
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/History" element={<History />} />
          <Route path="/Aboutus" element={<AboutUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
