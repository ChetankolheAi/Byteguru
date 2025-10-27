import React from "react";
import "./Popup.css"; // we'll create this next

function popup() {
 
 

  return (
    <div className="home-container">
      <h1>Welcome to PrimeGalaxy</h1>
      
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>🧠 Test Your Coding Skills!</h2>
            <p>
              Challenge yourself with AI-generated coding questions and see how well you perform.
            </p>
            <div className="popup-actions">
              <button className="start-btn">
                Start Test 🚀
              </button>
              <button className="close-btn">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
}

export default popup;
