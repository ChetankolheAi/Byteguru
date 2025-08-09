import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

function SideBar({ isOpen}) {
  return (
    

    
    <>
 
      <div
  className={`SideContainer ${isOpen ? 'open' : ''}`}
  style={{
    width: isOpen ? '200px' : '0px',
    transition: 'width 0.3s ease',
}}
>   
  <div className='Ok'>XRayAI</div>
  <div className="nav-item"><Link to="/"><i className="fa-solid fa-comments"></i> ChatBot</Link></div>
  <div className="nav-item"><Link to="/History"><i className="fa-solid fa-clock-rotate-left"></i> History</Link></div>
  {/* <div className="nav-item"><Link to="/"><i className="fa-solid fa-highlighter"></i> Styling</Link></div> */}
  <div className="nav-item"><Link to="/Aboutus"><i className="fa-regular fa-address-card"></i> AboutUs</Link></div>
  <div className="nav-item"><Link to="/Login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link></div>
</div>
      <div
  className={`SideContainerMobileSize ${isOpen ? 'open' : ''}`}
  style={{
    width: isOpen ? '200px' : '0px',
    transition: 'width 0.3s ease',
}}
>   

  <div className="nav-item"><Link to="/"><i className="fa-solid fa-comments"></i> ChatBot</Link></div>
  <div className="nav-item"><Link to="/History"><i className="fa-solid fa-clock-rotate-left"></i> History</Link></div>
  {/* <div className="nav-item"><Link to="/"><i className="fa-solid fa-highlighter"></i> Styling</Link></div> */}
  <div className="nav-item"><Link to="/Aboutus"><i className="fa-regular fa-address-card"></i> AboutUs</Link></div>
  <div className="nav-item"><Link to="/Login"><i className="fa-solid fa-right-to-bracket"></i> Login</Link></div>
</div>
   </>
  );
}

export default SideBar;
