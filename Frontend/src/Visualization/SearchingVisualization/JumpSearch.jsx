import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from "../../utils.js";
import { marked } from "marked";
import "./Sorting1.css";

const JumpSearch = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [target, setTarget] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); // current check
  const [blockIndex, setBlockIndex] = useState(-1);  // jump pointer
  const [foundIndex, setFoundIndex] = useState(-1);
  const [speed, setSpeed] = useState(200);
  const [botMessage, setBotMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const speedRef = useRef(speed);
  const stopSearch = useRef(false);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const sleep = () =>
    new Promise((r) => setTimeout(r, 1050 - speedRef.current));

  const resetArray = () => {
    stopSearch.current = true;
    let arr;

    if (userInput.trim()) {
      arr = userInput
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n))
        .sort((a, b) => a - b);
    } else {
      arr = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b);
    }

    setArray(arr);
    setActiveIndex(-1);
    setBlockIndex(-1);
    setFoundIndex(-1);
  };

  const handleJumpSearch = async () => {
    if (target === "") {
      notify("Please enter a target value");
      return;
    }

    stopSearch.current = false;
    const tgt = parseInt(target);
    const n = array.length;
    const step = Math.floor(Math.sqrt(n));

    let prev = 0;
    let curr = step;

    // 1️⃣ Jump phase
    while (curr < n && array[curr - 1] < tgt) {
      if (stopSearch.current) return;

      setBlockIndex(curr - 1);
      await sleep();

      prev = curr;
      curr += step;
    }

    // 2️⃣ Linear search in block
    for (let i = prev; i < Math.min(curr, n); i++) {
      if (stopSearch.current) return;

      setActiveIndex(i);
      await sleep();

      if (array[i] === tgt) {
        setFoundIndex(i);
        notify(`Element found at index ${i}`);
        return;
      }
    }

    notify("Element not found");
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — generate one first.");
      return;
    }

    setLoading(true);
    const prompt = `Explain step-by-step how Jump Search works on this sorted array: [${array.join(
      ", "
    )}] to find target ${target}. Explain jump size and block search.`;

    try {
      const res = await fetch(`${API_URL}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setBotMessage(marked.parse(data.response || ""));
    } catch {
      notify("Gemini API error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="visualizer">
      <h2>Jump Search Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";

          if (idx === blockIndex) cls += " left";   // jump point
          else if (idx === activeIndex) cls += " merge"; // linear scan
          else if (idx === foundIndex) cls += " sorted";

          return (
            <div key={idx} className="bar-wrapper">
              <div className={cls} style={{ height: `${val * 2 + 30}px` }} />
              <span className="bar-value">{val}</span>
            </div>
          );
        })}
      </div>

      <div className="bottom-btn">
        <div className="buttons-sort">
          <div className="slider-control">
            <label>Speed: {speed} ms</label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
            />
          </div>

          <div className="input-array">
            <label>Array:</label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="2, 5, 8, 12, 16, 23"
            />
            <button onClick={resetArray}>Set Array</button>
          </div>

          <div className="input-array">
            <label>Target:</label>
            <input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="16"
            />
          </div>

          <div className="inner-btn">
            <button onClick={resetArray}>Reset</button>
            <button onClick={handleJumpSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="gen-btn">
        <button onClick={handleGeminiCall} className="buttonGenerate">
          {loading ? "Generating..." : "Generate Explanation"}
        </button>
      </div>

      {loading && <div className="loading-spinner"></div>}
      <div
        className="ans"
        dangerouslySetInnerHTML={{ __html: botMessage }}
      ></div>
    </div>
  );
};

export default JumpSearch;
