import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from "../../utils.js";
import { marked } from "marked";
import "./Sorting1.css";

const BinarySearch = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [target, setTarget] = useState("");
  const [low, setLow] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [high, setHigh] = useState(-1);
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
    setLow(-1);
    setMid(-1);
    setHigh(-1);
    setFoundIndex(-1);
  };

  const handleBinarySearch = async () => {
    if (target === "") {
      notify("Please enter a target value");
      return;
    }

    stopSearch.current = false;
    const tgt = parseInt(target);
    let l = 0;
    let r = array.length - 1;

    while (l <= r) {
      if (stopSearch.current) return;

      const m = Math.floor((l + r) / 2);

      setLow(l);
      setMid(m);
      setHigh(r);
      await sleep();

      if (array[m] === tgt) {
        setFoundIndex(m);
        notify(`Element found at index ${m}`);
        return;
      } else if (array[m] < tgt) {
        l = m + 1;
      } else {
        r = m - 1;
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
    const prompt = `Explain step-by-step how Binary Search works on this sorted array: [${array.join(
      ", "
    )}] to find target ${target}. Explain low, mid, and high updates.`;

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
      <h2>Binary Search Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";

          if (idx === mid) cls += " merge";      // mid
          else if (idx === low) cls += " left";  // low
          else if (idx === high) cls += " right";// high
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
              placeholder="12"
            />
          </div>

          <div className="inner-btn">
            <button onClick={resetArray}>Reset</button>
            <button onClick={handleBinarySearch}>Search</button>
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

export default BinarySearch;
