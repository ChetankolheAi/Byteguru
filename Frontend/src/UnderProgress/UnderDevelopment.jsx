import React, { useEffect } from "react";
import "./UnderDevelopment.css";

const UnderDevelopment = () => {

  // Always start from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="under-dev-page">
      <div className="under-dev-card">
        <h2>🚧 Development Under Progress</h2>
        <p>
          This feature is currently under development.  
          We’re working hard to bring it to you soon.
        </p>
        <span>Stay tuned 🚀</span>
      </div>
    </div>
  );
};

export default UnderDevelopment;
