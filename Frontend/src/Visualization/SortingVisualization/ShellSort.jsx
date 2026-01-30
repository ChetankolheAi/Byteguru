import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from "../../utils.js";
import { marked } from "marked";
import "./Sorting1.css";

const ShellSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [gapIndex, setGapIndex] = useState(-1);
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
        .filter((n) => !isNaN(n));
    } else {
      arr = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 150) + 20
      );
    }

    setArray(arr);
    setActiveIndex(-1);
    setGapIndex(-1);
    setSortedIndices([]);
  };

  const handleShellSort = async () => {
    stopSorting.current = false;
    const arr = [...array];
    const n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        let temp = arr[i];
        let j = i;

        setGapIndex(i);

        while (j >= gap && arr[j - gap] > temp) {
          if (stopSorting.current) return;

          arr[j] = arr[j - gap];
          setActiveIndex(j);
          setArray([...arr]);
          await sleep();
          j -= gap;
        }

        arr[j] = temp;
        setArray([...arr]);
        await sleep();
      }
    }

    setSortedIndices([...Array(n).keys()]);
    setActiveIndex(-1);
    setGapIndex(-1);
  };

  const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — generate one first.");
      return;
    }

    setLoading(true);
    const prompt = `Explain step-by-step how Shell Sort works on this array: [${array.join(
      ", "
    )}]. Explain gap reduction and insertion sort behavior.`;

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
      <h2>Shell Sort Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";

          if (idx === activeIndex) cls += " merge";
          else if (idx === gapIndex) cls += " left";
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
              placeholder="12, 34, 54, 2, 3"
            />
            <button onClick={resetArray}>Set Array</button>
          </div>

          <div className="inner-btn">
            <button onClick={resetArray}>Reset</button>
            <button onClick={handleShellSort}>Shell Sort</button>
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

export default ShellSort;
