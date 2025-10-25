import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from '../../utils.js';
import { marked } from 'marked';
import Gemini from '../Gemini.png';
import "./Sorting1.css";

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchingIndex, setSearchingIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200);
  const speedRef = useRef(speed);
  const stopSorting = useRef(false);
  const [botMessage, setBotMessage] = useState("");
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

  const SelectionSort = async () => {
    stopSorting.current = false;
    const newArray = [...array];
    const sorted = [];

    for (let i = 0; i < newArray.length - 1; i++) {
      let minIndex = i;
      let MinValue = newArray[i];
      setActiveIndex(minIndex);

      for (let j = i + 1; j < newArray.length; j++) {
        setSearchingIndex(j);
        if (stopSorting.current) return;

        if (newArray[j] < MinValue) {
          MinValue = newArray[j];
          minIndex = j;
          setActiveIndex(minIndex);
        }
        await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
      }

      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      setArray([...newArray]);
      sorted.push(i);
      setSortedIndices([...sorted]);
      await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
    }
    setSearchingIndex(-1);
    setActiveIndex(-1);
    setSortedIndices([...Array(newArray.length).keys()]);
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — please generate one first.");
      return;
    }

    setLoading(true); // ✅ start loading
    setBotMessage(""); // clear previous message

    const prompt = `Explain step-by-step how Selection Sort works on this array: [${array.join(", ")}]. Include how comparisons and swaps happen in each pass.`;

    try {
      const res = await fetch(`${API_URL}/api/gemini`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.status === 400) {
        notify(data.error || 'Bad request');
        setLoading(false);
        return;
      }

      const markdown = data.response || '';
      const html = marked.parse(markdown);

      if (html) setBotMessage(html);
    } catch (err) {
      console.error('Gemini API error:', err);
      notify('Gemini API error: Server Not Responding');
    } finally {
      setLoading(false); // ✅ stop loading always
    }
  };

  return (
    <div className="visualizer">
      <h2>Selection Sorting Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let barClass = "bar";
          let barValueClass = "bar-value";
          if (sortedIndices.includes(idx)) {
            barClass += " sorted";
            barValueClass += " active";
          } else if (idx === searchingIndex) {
            barClass += " search";
            barValueClass += " search";
          } else if (idx === activeIndex) {
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
            <div className="bar-container barinfo" style={{ background: "rgb(128, 0, 255)" }}></div>
            <label>Search For Min</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#4caf50" }}></div>
            <label>Sorted-Area</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#ff5252" }}></div>
            <label>Min height bar in unsorted region</label>
          </div>
        </div>
      </section>

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
            <button onClick={SelectionSort}>Selection Sort</button>
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

export default SelectionSort;
