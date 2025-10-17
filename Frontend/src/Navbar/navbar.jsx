import React, { useState } from 'react';
import './navbar.css';
import ThemeChanger from '../ThemeChange/ThemeChanger';

function Navbar({ isOpen, toggleSidebar }) {
  const [showThemeChanger, setShowThemeChanger] = useState(false);

  const toggleThemePanel = () => {
    setShowThemeChanger(!showThemeChanger);
  };

  return (
    <div className="navbar">
      <div
        className="bars"
        onClick={toggleSidebar}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '20px',
          zIndex: 1000,
          color:'black'
        }}
      >
        <i className={`fa-solid ${isOpen ? 'fa-bars-staggered' : 'fa-bars'}`}></i>
      </div>

      <div className="LogoName">Byteguru</div>

      <div className="ThemeChanger" onClick={toggleThemePanel}></div>

      {showThemeChanger && (
        <div className="theme-popup">
          <ThemeChanger  closePanel={() => setShowThemeChanger(false)} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
