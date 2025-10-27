import React from 'react';
import { BrainCircuit } from 'lucide-react'; // Using Lucide icon

// Define the AILoader component
const AILoader = () => {

  return (
    <div className="loader-card">
      
      {/* Visual Loader Component: AI Core Pulse */}
      <div className="core-visual-area">
        
        {/* Outer Pulsing Ring - simulates a wake or signal propagation */}
        <div className="pulse-ring-outer"></div>

        {/* Mid-Layer Ring - acts as a container/border */}
        <div className="pulse-ring-mid"></div>

        {/* Inner Core - the static element representing the "brain" */}
        <div className="inner-core">
          <BrainCircuit className="core-icon" />
        </div>
      </div>
         <div className="ai-loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <span>Generating your test...</span>
        </div>
     
     
    </div>
  );
};

// Main App Component
const App = () => {
  return (
 
    <>
      <style>
        {`
        /* ------------------ Base & Global Styling ------------------ */
        .app-container {
          
         min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'Inter', sans-serif;
          position: fixed; /* Position fixed to cover entire viewport */
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(73, 73, 73, 0.71); /* 50% black overlay */
          z-index: 1000;
        }

     
        @keyframes ping-slow {
          0% {
            transform: scale(0.2);
            opacity: 0.8;
          }
          80% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        /* Custom keyframe for the progress bar pulse (simulated) */
        @keyframes pulse-width {
            0%, 100% {
                transform: translateX(-150%) scaleX(0.1);
                opacity: 0.4;
            }
            50% {
                transform: translateX(0%) scaleX(0.8);
                opacity: 0.9;
            }
            80% {
                transform: translateX(50%) scaleX(0.5);
                opacity: 0.6;
            }
        }

        /* Standard Pulse for the Icon */
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* ------------------ Loader Card Styling ------------------ */
        .loader-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background-color: #000000ff; /* gray-900 */
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3); /* shadow-2xl */
          max-width: 24rem;
          width: 70%;
          border: 1px solid #374151; /* gray-700 */
          transition: transform 300ms ease-in-out;
          transform:translateX(-10px);
        }

        .loader-card:hover {
          transform: scale(1.01);
        }

        /* ------------------ Visual Core Styling ------------------ */
        .core-visual-area {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 5rem; /* h-20 */
          width: 5rem; /* w-20 */
          margin-bottom: 1.5rem; /* mb-6 */
        }

        .pulse-ring-outer {
          position: absolute;
          height: 100%;
          width: 100%;
          border-radius: 9999px; /* rounded-full */
          background-color:  var(--theme-color-dark); /* cyan-500 */
          opacity: 0.2;
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          transition: all 1000ms;
        }

        .pulse-ring-mid {
          position: absolute;
          height: 6rem; /* h-16 */
          width: 6rem; /* w-16 */
          border-radius: 9999px; /* rounded-full */
          border: 4px solid  var(--theme-color-darker); /* border-4 border-cyan-400 */
          opacity: 0.5;
          transition: all 1000ms;
        }

        .inner-core {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 3rem; /* h-12 */
          width: 3rem; /* w-12 */
          border-radius: 9999px; /* rounded-full */
          background-color:  var(--theme-color-darker); /* cyan-700 */
          box-shadow: 0 0 15px var(--theme-color-dark-1);
          transition: all 500ms;
        }

        .core-icon {
          height: 1.5rem; /* h-6 */
          width: 1.5rem; /* w-6 */
          color: white; /* text-white */
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* ------------------ Text Styling ------------------ */
        .system-title {
          font-size: 1.25rem; /* text-xl */
          font-family: monospace; /* font-mono */
          color:  var(--theme-color); /* text-cyan-400 */
          margin-bottom: 0.5rem; /* mb-2 */
          white-space: nowrap;
        }

        .status-text {
          font-size: 0.875rem; /* text-sm */
          color: #9ca3af; /* text-gray-400 */
          font-family: sans-serif; /* font-sans */
          letter-spacing: 0.05em; /* tracking-wider */
          height: 1.25rem; /* h-5 */
          transition: opacity 500ms ease-in-out;
        }

        /* ------------------ Progress Bar Styling ------------------ */
        .progress-bar-container {
          width: 100%; /* w-full */
          height: 0.25rem; /* h-1 */
          background-color: #374151; /* bg-gray-700 */
          border-radius: 9999px; /* rounded-full */
          margin-top: 1rem; /* mt-4 */
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%; /* h-full */
          background-color:  var(--theme-color); /* bg-cyan-500 */
          border-radius: 9999px; /* rounded-full */
          animation: pulse-width 2s ease-in-out infinite;
          transform-origin: left;
        }
          .ai-generator-container {
  text-align: center;
  font-family: "Poppins", sans-serif;
  padding: 40px;
}

.level-select {
  margin: 15px 0;
}

.generate-btn {
          background-color:  var(--theme-color); /* cyan-500 */
  border: none;
  color: white;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.generate-btn:hover {
  background: #3867d6;
}

.ai-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 25px;
  font-size: 16px;
  color: #ffffffff;
  animation: fadeIn 0.5s ease-in-out;
      font-family: Outfit, sans-serif;
    font-weight: 500;

}

.dot {
  width: 10px;
  height: 10px;
          background-color: var(--theme-color); /* cyan-500 */
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.question-list {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.question-list li {
  background: #f1f2f6;
  border-radius: 8px;
  margin: 8px auto;
  padding: 10px 15px;
  width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-left:50px;
}

        `}
      </style>
      <div className="app-container">
        <AILoader />
      </div>
    </>
  );
};

export default App;
