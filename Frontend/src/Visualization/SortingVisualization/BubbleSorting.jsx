import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from '../../utils.js';
import { marked } from 'marked';
import Gemini from '../Gemini.png';
import "./Sorting1.css";

const BubbleSorting = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [botMessage, setBotMessage] = useState(""); // 💡 new state for explanation
  const speedRef = useRef(speed);
  const stopSorting = useRef(false);
  const [loading, setLoading] = useState(false); // ✅ added
  
  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const resetArray = () => {
    stopSorting.current = true;
    let arr;
    if (userInput.trim() !== "") {
      arr = userInput
        .split(",")
        .map((num) => parseInt(num.trim()) + 100)
        .filter((num) => !isNaN(num));
    } else {
      arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 150) + 20);
    }
    setArray(arr);
    setActiveIndex(-1);
    setSortedIndices([]);
  };

  const bubbleSort = async () => {
    stopSorting.current = false;
    const newArray = [...array];
    const sorted = [];

    for (let i = 0; i < newArray.length; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (stopSorting.current) return;
        setActiveIndex(j);

        if (newArray[j] > newArray[j + 1]) {
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArray([...newArray]);
        }

        await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
      }

      sorted.push(newArray.length - i - 1);
      setSortedIndices([...sorted]);
    }

    setActiveIndex(-1);
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — please generate one first.");
      return;
    }
    setLoading(true);
    const prompt = `Explain step-by-step how Bubble Sort works on this array: [${array.join(", ")}]. Include how comparisons and swaps happen in each pass.`;

    try {
      const res = await fetch(`${API_URL}/api/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.status === 400) {
        notify(data.error || 'Bad request');
        return;
      }

      const markdown = data.response || '';
      const html = marked.parse(markdown);

      if (html) setBotMessage(html); // ✅ Store explanation
    } catch (err) {
      console.error('Gemini API error:', err);
      notify('Gemini API error: Server Not Responding');
    }finally {
      setLoading(false); // ✅ stop loading always
    }
  };

  return (
    <div className="visualizer">
      <h2>Bubble Sorting Visualizer</h2>
    
      <div className="bar-container">
        {array.map((val, idx) => {
          let barClass = "bar";
          let barValueClass = "bar-value";
          if (sortedIndices.includes(idx)) {
            barClass += " sorted";
            barValueClass += " active";
          } else if (idx === activeIndex || idx === activeIndex + 1) {
            barClass += " active";
            barValueClass += " active";
          }

          return (
            <div key={idx} className="bar-wrapper">
              <div className={barClass} style={{ height: `${val}px` }}></div>
              <span className={barValueClass}>{val}</span>
            </div>
          );
        })}
      </div>

      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#4caf50" }}></div>
            <label>Sorted Area</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#ff5252" }}></div>
            <label>Swapping Larger Element to Last</label>
          </div>
        </div>
      </section>


      {/* Display the AI Explanation */}

      <div className="bottom-btn">
        <div className="buttons-sort">
          <div className="slider-control" style={{ "--value": speed }}>
            <label>Speed: {speed} ms</label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <div className="input-array">
            <label>Enter array (comma separated): </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g. 5, 3, 8, 1, 2"
            />
            <button onClick={resetArray}>Set Array</button>
           
          </div>
 <div className="inner-btn">
              <button onClick={resetArray}>Reset</button>
              <button onClick={bubbleSort}>Bubble Sort</button>
            </div>
        </div>
      </div>
       <div className="gen-btn">
              <button onClick={handleGeminiCall} className="buttonGenerate">
                {loading ? "Generating..." : "Generate Explanation"}{" "}
                {!loading && <img src="https://res.cloudinary.com/dmuecdqxy/q_auto/v1737001422/static/magiciconwhitegradientsvg_1737001421_51952.svg" className="v3-prompt-button-star-icon" alt="" height={20} width={30} />}
              </button>
            </div>
      
            {loading && <div className="loading-spinner"></div>} {/* ✅ optional spinner */}
            <div className="ans" dangerouslySetInnerHTML={{ __html: botMessage }}></div>
        

    </div>
  );
};

export default BubbleSorting;
