import React, { useState, useEffect, useRef } from 'react';

function Insertionsort() {
  const [array, setArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [key , setKey] = useState();
  const [sortedIndices, setSortedIndices] = useState([]);
  const [speed, setSpeed] = useState(200);
  const speedRef = useRef(speed);
  const stopSorting = useRef(false);

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
      arr = Array.from({ length: 9 }, () => Math.floor(Math.random() * 150) + 20);
    }
    setArray(arr);
    setActiveIndex(-1);
    setActiveIndex(-1);
    setSortedIndices([]);
  };

  const insertionSort = async () => {
    stopSorting.current = false;
    const newArray = [...array];
    const sorted = [];
    sorted.push(0);
    for (let i = 1; i < newArray.length; i++) {
      let key = newArray[i];
      let j = i - 1;
      setKey(key);
      setActiveIndex(i);
      await new Promise((r) => setTimeout(r, 1050 - speedRef.current));

      while (j >= 0 && newArray[j] > key) {
        if (stopSorting.current) return;

        newArray[j + 1] = newArray[j];
        setActiveIndex(j);

        setArray([...newArray]);
        await new Promise((r) => setTimeout(r, 1050 - speedRef.current));

        j--;
      }

      newArray[j + 1] = key;
      setArray([...newArray]);

      sorted.push(i);
      setSortedIndices([...sorted]);
      await new Promise((r) => setTimeout(r, 1050 - speedRef.current));
    }

    setActiveIndex(-1);
    setSortedIndices(newArray.map((_, idx) => idx));
  };

  return (
    <div className="visualizer">
      <h2>Insertion Sorting Visualizer</h2>

      <div className="bar-container">
        {array.map((val, idx) => {
          let barClass = "bar";
          let barValueClass = "bar-value";
          if (idx === activeIndex || idx === activeIndex) {
            barClass += " active";
            barValueClass += " active";
          }
         else if (sortedIndices.includes(idx)) {
            barClass += " sorted";
            barValueClass += " sorted";
        }
        

          return (
            <div key={idx} className="bar-wrapper">
              <div className={barClass} style={{ height: `${val}px` }}></div>
              <span className={barValueClass}>{val}</span>
            </div>

          );
        })}
        <span>Key:</span><div className="key">{key}</div>
      </div>

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
            <button onClick={insertionSort}>Insertion Sort</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insertionsort;
