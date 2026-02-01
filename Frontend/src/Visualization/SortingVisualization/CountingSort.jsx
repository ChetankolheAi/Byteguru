import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from "../../utils.js";
// import { marked } from "marked";
import { callGemini } from "../geminiService.js";
import "./Sorting1.css";

const CountingSort = () => {
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

    if (userInput.trim() !== "") {
      arr = userInput
        .split(",")
        .map((n) => parseInt(n.trim()))
        .filter((n) => !isNaN(n) && n >= 0);
    } else {
      arr = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 20)
      );
    }

    setArray(arr);
    setActiveIndex(-1);
    setSortedIndices([]);
  };

  const handleCountingSort = async () => {
    stopSorting.current = false;
    const arr = [...array];

    if (!arr.length) return;

    const max = Math.max(...arr);
    const count = new Array(max + 1).fill(0);

    // 1️⃣ Count frequency
    for (let i = 0; i < arr.length; i++) {
      if (stopSorting.current) return;
      setActiveIndex(i);
      count[arr[i]]++;
      await sleep();
    }

    // 2️⃣ Place elements back
    let index = 0;
    for (let num = 0; num < count.length; num++) {
      while (count[num] > 0) {
        if (stopSorting.current) return;
        arr[index] = num;
        setActiveIndex(index);
        setSortedIndices((prev) => [...prev, index]);
        setArray([...arr]);
        count[num]--;
        index++;
        await sleep();
      }
    }

    setActiveIndex(-1);
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — please generate one first.");
      return;
    }

    setLoading(true);
    const prompt = `Explain step-by-step how Counting Sort works on this array: [${array.join(
      ", "
    )}]. Explain frequency counting and placement process.`;

    callGemini({
    prompt,
    setLoading,
    onSuccess: setBotMessage,
    onError: notify,
    });
  };
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className="visualizer">
      <h2>Counting Sort Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";
          let valCls = "bar-value";

          if (idx === activeIndex) cls += " merge";
          else if (sortedIndices.includes(idx)) cls += " sorted";

          return (
            <div key={idx} className="bar-wrapper">
              <div className={cls} style={{ height: `${val * 10 + 20}px` }} />
              <span className={valCls}>{val}</span>
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
            <label>Enter array: </label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="5, 3, 8, 1, 2"
            />
            <button onClick={resetArray}>Set Array</button>
          </div>

          <div className="inner-btn">
            <button onClick={resetArray}>Reset</button>
            <button onClick={handleCountingSort}>Counting Sort</button>
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

export default CountingSort;
