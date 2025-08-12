import React, { useState } from 'react';
import './Chatpage.css';
import { marked } from 'marked';
import { API_URL, notify } from '../utils.js';

function Chatpage() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userId] = useState(localStorage.getItem('userId') || '');
  const today = new Date();
  const formattedDate = `${today.getDate()+1}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log(formattedDate);
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleGeminiCall = async () => {
  if (!userInput.trim()) return;

  setLoading(true);

  // Add user message first
  const userMessage = { sender: 'user', text: userInput };
  setChatHistory((prev) => [...prev, userMessage]);

  try {
    // 1️⃣ Call Gemini API
    const res = await fetch(`${API_URL}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userInput,
        chatHistory: [...chatHistory, userMessage], // include latest message
      }),
    });

    const data = await res.json();
    if (res.status === 400) {
      notify(data.error || 'Bad request');
      return;
    }

    const markdown = data.response || '';
    const html = marked.parse(markdown);

    // 2️⃣ Save chat history in backend
    try {
      const HistoryData = {
        userid: userId,
        history: [...chatHistory, userMessage, { sender: 'bot', text: html }],
        date:formattedDate
      };

      const historyRes = await fetch(`${API_URL}/api/History`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(HistoryData),
      });

      const historyResult = await historyRes.json();
      console.log('History save result:', historyResult);
    } catch (err) {
      console.error('Error saving history:', err);
    }

    // 3️⃣ Add bot message to UI
    if (html) {
      const botMessage = { sender: 'bot', text: html };
      setChatHistory((prev) => [...prev, botMessage]);
    }

  } catch (err) {
    console.error('Gemini API error:', err);
    setChatHistory((prev) => [
      ...prev,
      { sender: 'bot', text: 'Error connecting to Gemini API' },
    ]);
  }

  setLoading(false);
  setUserInput('');
};


  return (
    <div className="Container">
      <div className="chat-container">
        <div className="chat-box">
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
              >
                {msg.sender === 'bot' ? (
                  <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  <span>{msg.text}</span>
                )}
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
