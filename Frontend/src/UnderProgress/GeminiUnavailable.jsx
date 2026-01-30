import React, { useEffect } from "react";
import "./UnderDevelopment.css";

const GeminiUnavailable = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="under-dev-page">
      <div className="under-dev-card">
        <h2>⚠️ Feature Temporarily Unavailable</h2>
        <p>
          The Gemini API is currently not responding.  
          This feature is temporarily unavailable.
        </p>
        <span>Please try again later 🙏</span>
      </div>
    </div>
  );
};

export default GeminiUnavailable;
