import React, { useState, useEffect, useRef } from "react";
import { API_URL, notify } from '../../utils.js';
import { marked } from 'marked';
import Gemini from '../Gemini.png';
import "./Sorting1.css";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState(""); // for user input
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchingIndex, setSearchingIndex] = useState(-1);
  const [swappingIndex, setSwappingIndex] = useState(-1);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200); // default speed
  const speedRef = useRef(speed);
  const stopSorting = useRef(false);
  const [botMessage, setBotMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ added
  
  useEffect(() => {
    resetArray(); // default random array
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const resetArray = () => {
    stopSorting.current = true; // stop the current sort
    let arr;
    if (userInput.trim() !== "") {
    
      arr = userInput
        .split(",")
        .map((num) => parseInt(num.trim())+100)
        .filter((num) => !isNaN(num));
    } else {
      arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 150) + 20);
    }
    setArray(arr);
    setActiveIndex(-1);
    setSortedIndices([]);
    setSearchingIndex(-1);
    setSwappingIndex(-1);
  };
  
  const handleQuickSort = async () => {
    stopSorting.current = false;
    const arrCopy = [...array];
    const sortedSet = new Set();
    
    const qs = async (arr, left, right) => {
      if (left >= right || stopSorting.current) return;
      
      let pivotIndex = right;
      let pivot = arr[pivotIndex];
      setActiveIndex(pivotIndex);
      
      let i = left;
      setSwappingIndex(i);
      for (let j = left; j < right; j++) {
        setSearchingIndex(j);
        if (stopSorting.current) return;
        
        if (arr[j] < pivot) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          i++;
        }
        await new Promise((r) => setTimeout(r, 1150 - speedRef.current));
      }
      // Place pivot at correct position
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      setArray([...arr]);
      sortedSet.add(i);
      
      await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
      
      // Recursive calls
      await qs(arr, left, i - 1);
      await qs(arr, i + 1, right);
    };
    
    await qs(arrCopy, 0, arrCopy.length - 1);
    setSortedIndices([...Array(array.length).keys()]); // All sorted at the end
    setActiveIndex(-1);
    setSearchingIndex(-1);
    setSwappingIndex(-1);
};
const handleGeminiCall = async () => {
    if (!array.length) {
      notify("Array is empty — please generate one first.");
      return;
    }
        setLoading(true); // ✅ start loading

    const prompt = `Explain step-by-step how Quick Sort works on this array: [${array.join(", ")}]. Include how comparisons and swaps happen in each pass.`;

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
    }
  };
  return (
    <div className="visualizer">
      <h2>Quick Sort Visualizer</h2>


      <div className="bar-container">
        {array.map((val, idx) => {
          let barClass = "bar";
          let barValueClass = "bar-value";
          if (sortedIndices.includes(idx)) {
            barClass += " sorted";
            barValueClass += " active";

          }
          else if(idx === swappingIndex){
              barClass += " swap";
              barValueClass += " swap";
          }
          else if(idx === searchingIndex){
              barClass += " search";
              barValueClass += " search";
          }
          else if (idx === activeIndex) {
            barClass += " active";
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
            <div className="bar-container barinfo" height={10} style={{background:"rgb(128, 0, 255)"}}></div>
            <label htmlFor="">Current Element Being Compared</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" height={10} style={{background:"#4caf50"}}></div>
            <label htmlFor="">Sorted / Final Position</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" height={10} style={{background:"#ff5252"}}></div>
            <label htmlFor="">Pivot Element</label>
          </div>
          <div className="sec1">
            <div className="bar-container barinfo" height={10} style={{background:"#ff02a6ff"}}></div>
            <label htmlFor="">Swapping element smaller than pivot into correct position</label>
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
            <button onClick={handleQuickSort}>Quick Sort</button>
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

export default QuickSort;
