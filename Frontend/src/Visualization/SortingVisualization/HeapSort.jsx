import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from '../../utils.js';
import { callGemini } from "../geminiService.js";

import "./Sorting1.css";

const HeapSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [swapIndex, setSwapIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [botMessage, setBotMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added
  const speedRef = useRef(speed);
  const stopSorting = useRef(false);

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const sleep = () =>
    new Promise(r => setTimeout(r, 1050 - speedRef.current));

  const resetArray = () => {
    stopSorting.current = true;
    let arr;

    if (userInput.trim() !== "") {
      arr = userInput
        .split(",")
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));
    } else {
      arr = Array.from({ length: 10 }, () =>
        Math.floor(Math.random() * 150) + 20
      );
    }

    setArray(arr);
    setActiveIndex(-1);
    setSwapIndex(-1);
    setSortedIndices([]);
  };

  const heapify = async (arr, n, i) => {
    if (stopSorting.current) return;

    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    setActiveIndex(i);

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
      setSwapIndex(largest);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      await sleep();
      await heapify(arr, n, largest);
    }
  };

  const handleHeapSort = async () => {
    stopSorting.current = false;
    const arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (stopSorting.current) return;

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setSwapIndex(i);
      setSortedIndices(prev => [...prev, i]);
      setArray([...arr]);
      await sleep();
      await heapify(arr, i, 0);
    }

    setSortedIndices([...Array(n).keys()]);
    setActiveIndex(-1);
    setSwapIndex(-1);
  };


   const handleGeminiCall = async () => {
        if (!array.length) {
          notify("Array is empty — please generate one first.");
          return;
        }
        setLoading(true);
        const prompt = `Explain step-by-step how Merge Sort works on this array: [${array.join(", ")}]. Include how comparisons and swaps happen in each pass.`;
    
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
      <h2>Heap Sort Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let cls = "bar";
          let valCls = "bar-value";

          if (idx === activeIndex) cls += " left";
          else if (idx === swapIndex) cls += " merge";
          else if (sortedIndices.includes(idx)) cls += " sorted";

          return (
            <div key={idx} className="bar-wrapper">
              <div className={cls} style={{ height: `${val}px` }} />
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
          <button onClick={handleHeapSort}>Heap Sort</button>
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

export default HeapSort;
