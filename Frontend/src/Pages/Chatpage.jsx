import React, { useState } from 'react';
import './Chatpage.css';

function Chatpage() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false); // Track if Gemini is responding
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGeminiCall = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const userMessage = { sender: 'user', text: userInput };
    setChatHistory((prev) => [...prev, userMessage]);
    //https://xrayai-kzo5.onrender.com
    try {
      const res = await fetch('https://xrayai-kzo5.onrender.com/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      const botMessage = {
        sender: 'bot',
        text: data.response || "Sorry, I couldn't understand that.",
      };
      
      
      setChatHistory((prev) => [...prev, botMessage]);
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error connecting to Gemini API' },
      ]);
    }
    
    setLoading(false);
    setUserInput('');
  };
  

  return (
    <>
    <div className="Container">
      <div className="chat-container">
      {/* <h1 className="chat-title">XRayAI Chatbot</h1> */}

    <div className="chat-box">
      {chatHistory && chatHistory.length > 0 ? (
        chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <span>{msg.text}</span>
          </div>
        ))
      ) : (
        <div className="GreetingMssg">
          <span>Good Afternoon </span>
          <p>How can I help you today?</p>
        </div>
      )}
    </div>


      <div className="input-section">
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              handleGeminiCall()
            }
          }}

          placeholder="Ask something..."
        />
        <button onClick={handleGeminiCall} disabled={loading}> Send</button>
      </div>
    </div>

    {/* {chatHistory.map((chat, index) => (
    <div key={index} className={`chat-bubble ${chat.sender}`}>
        <strong>{chat.sender === "user" ? "You" : ""}:</strong> {chat.sender === "user" ? chat.text : ""}
    </div>
    ))} */}

    </div>
    </>
  
  );
}

export default Chatpage;
