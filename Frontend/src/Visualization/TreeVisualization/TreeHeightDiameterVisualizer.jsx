import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

// Tree node structure
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const TreeHeightVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState(""); 
  const [highlightNode, setHighlightNode] = useState(null);
  const [height, setHeight] = useState(null);
  const [Diameter, setDiameter] = useState(null);
  const [speed, setSpeed] = useState(200);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);




  // Default tree
  useEffect(() => {
    const defaultArr = [1, 2, 3, 4, 5, null, 7];
    setRoot(buildTree(defaultArr));
  }, []);




  // Build tree from array
  const buildTree = (arr) => {
    if (!arr.length) return null;
    const nodes = arr.map((val) => (val !== null ? new TreeNode(val) : null));
    let root = nodes[0];
    let j = 1;
    for (let i = 0; i < nodes.length && j < nodes.length; i++) {
      if (nodes[i] !== null) {
        nodes[i].left = nodes[j++] || null;
        nodes[i].right = nodes[j++] || null;
      }
    }
    return root;
  };


    //Tree Maker
  const handleSetTree = () => {
    if (!userInput.trim()) return;
    const arr = userInput
      .split(",")
      .map((v) => (v.trim() === "null" ? null : parseInt(v.trim())));
      if (window.innerWidth < 500 && arr.length > 7) {
        alert("Maximum 7 nodes allowed on small screens!");
        return;
      }
    setRoot(buildTree(arr));
    setHighlightNode(null);
    setHeight(null);
    setDiameter(null);
  };




  // Height calculation with animation
  const calculateHeight = async (node) => {
    if (!node) return 0;

    setHighlightNode(node.val);
    await new Promise((r) => setTimeout(r, 1100-speedRef.current));
    
    const leftHeight = await calculateHeight(node.left);
    const rightHeight = await calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const handleCalculateHeight = async () => {
    setDiameter(null);
    if (!root) return;
    const h = await calculateHeight(root);
    setHeight(h);
    setHighlightNode(null);
  };





 const calculateDiameter = async (node) => {
  let diameter = 0;

  
  const height = async (n) => {
    if (!n) return 0;

    setHighlightNode(n.val);
    await new Promise((r) => setTimeout(r, 1100 - speedRef.current));

    const leftHeight = await height(n.left);
    const rightHeight = await height(n.right);

    diameter = Math.max(diameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  };

  await height(node); 
  return diameter;
};


 const handleCalculateDiameter = async () => {
  setHeight(null);
  if (!root) return;
  const d = await calculateDiameter(root);
  setDiameter(d+1);
  setHighlightNode(null);
};



  // Render tree with connection lines
  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="tree-node-container">
        <div
          className={`tree-node ${highlightNode === node.val ? "highlight" : ""}`}
        >
          {node.val}
        </div>
        {(node.left || node.right) && (
          <div className="tree-children">
            <div className="childNode">

            {renderTree(node.left)}
            </div>
            <div className="childNode">

            {renderTree(node.right)}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="visualizer">
      <h2>Binary Tree Height Visualizer</h2>

      <div className="tree-container">{renderTree(root)}</div>
       <div className="result">
                {height?<h3>Tree Height  :  {height}</h3>:""}
                {Diameter?<h3>Tree Diameter  :{Diameter}</h3>:""}
      </div>
       <section className ="info">
        <div className="info-section">
          <div className="csec1">

          </div>
          <div className="sec1">
            <div className="bar-container barinfo" height={10} style={{background:"#ff5252"}}></div>
            <label htmlFor="">Node Traversal</label>
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
            <label>Enter tree nodes (comma separated): </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g. 5, 3, 8, null, 2"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>
          <div className="inner-btn">
            <button onClick={handleCalculateDiameter}>Calculate Diameter</button>
            <button onClick={handleCalculateHeight}>Calculate Height</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeHeightVisualizer;
