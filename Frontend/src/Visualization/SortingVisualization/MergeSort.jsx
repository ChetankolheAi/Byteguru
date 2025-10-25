import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from '../../utils.js';
import { marked } from 'marked';
import Gemini from '../Gemini.png';
import "./Sorting1.css";

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [leftIndex, setLeftIndex] = useState(-1);
  const [rightIndex, setRightIndex] = useState(-1);
  const [mergedIndex, setMergedIndex] = useState(-1);
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
    setLeftIndex(-1);
    setRightIndex(-1);
    setMergedIndex(-1);
    setSortedIndices([]);
  };

  const handleMergeSort = async () => {
    stopSorting.current = false;
    const arrCopy = [...array];

    const merge = async (arr, l, m, r) => {
  const leftArr = arr.slice(l, m + 1);
  const rightArr = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < leftArr.length && j < rightArr.length) {
    setLeftIndex(l + i);
    setRightIndex(m + 1 + j);
    if (stopSorting.current) return;

    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      setMergedIndex(k);
      i++;
    } else {
      arr[k] = rightArr[j];
      setMergedIndex(k);
      j++;
    }

    setArray([...arr]);
    await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    setMergedIndex(k);
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    setMergedIndex(k);
    setArray([...arr]);
    await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
    j++;
    k++;
  }

  // ✅ Highlight current merged group
  const sortedGroup = Array.from({ length: r - l + 1 }, (_, idx) => l + idx);
  setSortedIndices((prev) => [...new Set([...prev, ...sortedGroup])]);

  // Optional delay to visualize that this group is done
  await new Promise((r) => setTimeout(r, 400));
};

    const ms = async (arr, l, r) => {
      if (l >= r || stopSorting.current) return;
      const m = Math.floor((l + r) / 2);
      await ms(arr, l, m);
      await ms(arr, m + 1, r);
      await merge(arr, l, m, r);
    };

    await ms(arrCopy, 0, arrCopy.length - 1);
    setSortedIndices([...Array(array.length).keys()]);
    setLeftIndex(-1);
    setRightIndex(-1);
    setMergedIndex(-1);
  };
  const handleGeminiCall = async () => {
      if (!array.length) {
        notify("Array is empty — please generate one first.");
        return;
      }
      setLoading(true);
      const prompt = `Explain step-by-step how Merge Sort works on this array: [${array.join(", ")}]. Include how comparisons and swaps happen in each pass.`;
  
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
      <h2>Merge Sort Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let barClass = "bar";
          let barValueClass = "bar-value";
          if (idx === leftIndex) {
            barClass += " left";
            barValueClass += " left";
          } else if (idx === rightIndex) {
            barClass += " right";
            barValueClass += " right";
          }else if (idx === mergedIndex) {
            barClass += " merge";
            barValueClass += " merge";
          } 
          else if (sortedIndices.includes(idx)) {
            barClass += " sorted";
            barValueClass += " active";
          }
           
          return (
            <div key={idx} className="bar-wrapper" >
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
            <label>Left Subarray Element</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "orange" }}></div>
            <label>Right Subarray Element</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#ff02a6ff" }}></div>
            <label>Merged Element</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" style={{ background: "#4caf50" }}></div>
            <label>Sorted / Final Position</label>
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
            <button onClick={handleMergeSort}>Merge Sort</button>
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

export default MergeSort;
