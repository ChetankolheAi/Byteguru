import React, { useState } from 'react';
import './Chatpage.css';

function Chatpage() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGeminiCall = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: 'user', text: userInput };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:5000/api/gemini', {
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

    setUserInput('');
  };

  return (
    <>
    <div className="Container">
      <div className="chat-container">
      <h1 className="chat-title">XRayAI Chatbot</h1>

      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'bot'}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      <div className="input-section">
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          onKeyDown={(e) => e.key === 'Enter' && handleGeminiCall()}
          placeholder="Ask something..."
        />
        <button onClick={handleGeminiCall}>Send</button>
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
