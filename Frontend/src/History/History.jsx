import React, {useState, useEffect } from 'react';
import { API_URL } from '../utils';
import './History.css';


function History({ userid }) {
  
  const [history, setChatHistory] = useState([]);
  const today = new Date();
  const formattedDate = `${today.getDate()+1}/${today.getMonth() + 1}/${today.getFullYear()}`;
  console.log(formattedDate);

  
useEffect(() => {
    if (!userid) return;
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_URL}/api/getHistory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: userid , Date:formattedDate }),
      });

      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();
      console.log("User History:", data);

      // data.history is already an array
      setChatHistory(data.history);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  fetchHistory();
}, [userid ,formattedDate]);

return (
  <div className="History">

    <div className="chat-container history">
      <div className="chat-box">
        {history && history.length > 0 ? (
          history.map((dayHistory, idx) => (
            <div key={idx} className="DateContainer">
              <h2>{dayHistory.date}</h2>
              {dayHistory.Datehistory && dayHistory.Datehistory.length > 0 ? (
                dayHistory.Datehistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${msg.sender}`}
                  >
                    {msg.sender === "bot" ? (
                      <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                    ) : (
                      <span>{msg.text}</span>
                    )}
                  </div>
                ))
              ) : (
                <p>No messages for this date</p>
              )}
            </div>
          ))
        ) : (
          <div className="GreetingMssg">
            <span>Start Chat With XRayAi</span>
            <p>No history to show</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

}

export default History;
