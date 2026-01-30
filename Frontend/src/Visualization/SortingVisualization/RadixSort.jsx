import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from "../../utils.js";
import { marked } from "marked";
import "./Sorting1.css";

const RadixSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [botMessage, setBotMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const speedRef = useRef(speed);
  const stopSorting = useRef(false);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const sleep = () =>
    new Promise((r) => setTimeout(r, 1050 - speedRef.current));

  const resetArray = () => {
    stopSorting.current = true;
    let arr;

    if (userInput.trim()) {
      arr = userInput
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n) && n >= 0);
    } else {
      arr = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 190) + 10
      );
    }

    setArray(arr);
    setActiveIndex(-1);
    setSortedIndices([]);
  };

  const countingSortByDigit = async (arr, exp) => {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      if (stopSorting.current) return arr;

      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
      setActiveIndex(i);
      setArray([...arr]);
      await sleep();
    }

    return arr;
  };

  const handleRadixSort = async () => {
    stopSorting.current = false;
    let arr = [...array];
    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      if (stopSorting.current) return;
      arr = await countingSortByDigit(arr, exp);
    }

    setSortedIndices([...Array(arr.length).keys()]);
    setActiveIndex(-1);
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — generate one first.");
      return;
    }

    setLoading(true);
    const prompt = `Explain step-by-step how Radix Sort works on this array: [${array.join(
      ", "
    )}]. Explain digit-wise sorting using Counting Sort.`;

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
      <h2>Radix Sort Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";
          if (idx === activeIndex) cls += " merge";
          else if (sortedIndices.includes(idx)) cls += " sorted";

          return (
            <div key={idx} className="bar-wrapper">
              <div className={cls} style={{ height: `${val}px` }} />
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
            <label>Enter array:</label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="170, 45, 75, 90"
            />
            <button onClick={resetArray}>Set Array</button>
          </div>

          <div className="inner-btn">
            <button onClick={resetArray}>Reset</button>
            <button onClick={handleRadixSort}>Radix Sort</button>
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

export default RadixSort;
