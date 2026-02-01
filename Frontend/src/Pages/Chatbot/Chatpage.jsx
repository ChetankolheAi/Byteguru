import React, { useState,useEffect } from 'react';
import './Chatpage.css';
import { marked } from 'marked';
import { API_URL, notify } from '../../utils.js';

function Chatpage({userid,firstname}) {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [greeting, setGreeting] = useState("");

  console.log(userid)
  const today = new Date();
  const formattedDate = `${today.getDate()+1}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log(formattedDate);
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
    useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting("Good Morning");
    } else if (hours >= 12 && hours < 17) {
      setGreeting("Good Afternoon");
    } else if (hours >= 17 && hours < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Evening");
    }
  }, []);



  const handleGeminiCall = async () => {
  if (!userInput.trim() || loading) return;

  setLoading(true);

  const userMessage = { sender: 'user', text: userInput };
  const updatedHistory = [...chatHistory, userMessage];
  setChatHistory(updatedHistory);

  try {
    const res = await fetch(`${API_URL}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userInput
      }),
    });

    const data = await res.json();

    if (res.status === 429) {
      notify("Too many requests. Please wait.");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      notify(data.error || "Gemini error");
      setLoading(false);
      return;
    }

    const html = marked.parse(data.response || '');
    setChatHistory((prev) => [...prev, { sender: 'bot', text: html }]);

  } catch (err) {
    notify("Server not responding");
    console.log(err)
  }

  setLoading(false);
  setUserInput('');
};


  return (
    
    <div className="Container">
      
      <div className="chat-container">
        <div className="chat-box">
        {chatHistory && chatHistory.length > 0 ? (
          <>
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.sender === "bot" ? (
                  <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>
            ))}

            {/* Loader should appear only once while waiting */}
            {loading && (
              <div className="chat-message bot loading">
                <div className="ai-loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="GreetingMssg">
            <span>
              {greeting}! {userid ? firstname : ""}
            </span>
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
              if (e.key === 'Enter' && !loading) {
                handleGeminiCall();
              }
            }}
            placeholder="Ask something..."
          />
          <button onClick={handleGeminiCall} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
