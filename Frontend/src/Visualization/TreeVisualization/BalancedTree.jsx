import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const BalancedTree = () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [highlightNode, setHighlightNode] = useState(null);
  const [result, setResult] = useState("");
  const [speed, setSpeed] = useState(300);
  const speedRef = useRef(speed);



    useEffect(() => {
  window.scrollTo(0, 0);
}, []); 
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Default tree
  useEffect(() => {
    const defaultArr = [1, 2, 3, 4, 5, null, null];
    setRoot(buildTree(defaultArr));
  }, []);

  // Build tree (level order)
  const buildTree = (arr) => {
    if (!arr.length) return null;
    const nodes = arr.map((val) => (val !== null ? new TreeNode(val) : null));
    let j = 1;
    for (let i = 0; i < nodes.length && j < nodes.length; i++) {
      if (nodes[i]) {
        nodes[i].left = nodes[j++] || null;
        nodes[i].right = nodes[j++] || null;
      }
    }
    return nodes[0];
  };

  const handleSetTree = () => {
    if (!userInput.trim()) return;

    const arr = userInput
      .split(",")
      .map((v) => (v.trim() === "null" ? null : parseInt(v.trim())));

    setRoot(buildTree(arr));
    setResult("");
    setHighlightNode(null);
  };

  //Height check with animation
  const checkHeight = async (node) => {
    if (!node) return 0;

    const left = await checkHeight(node.left);
    if (left === -1) return -1;

    const right = await checkHeight(node.right);
    if (right === -1) return -1;

    setHighlightNode(node.val);
    await new Promise((r) =>
      setTimeout(r, 1150 - speedRef.current)
    );

    if (Math.abs(left - right) > 1) return -1;

    return Math.max(left, right) + 1;
  };

  const handleCheckBalanced = async () => {
    if (!root) return;

    setResult("");
    setHighlightNode(null);

    const ans = await checkHeight(root);

    setHighlightNode(null);
    setResult(ans === -1 ? "❌ Tree is NOT Balanced" : "✅ Tree is Balanced");
  };

  // Render tree
  const renderTree = (node) => {
    if (!node) return null;
    return (
      <div className="tree-node-container">
        <div
          className={`tree-node ${
            highlightNode === node.val ? "highlight" : ""
          }`}
        >
          {node.val}
        </div>
        {(node.left || node.right) && (
          <div className="tree-children">
            <div className="childNode">{renderTree(node.left)}</div>
            <div className="childNode">{renderTree(node.right)}</div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="visualizer">
      <h2>Balanced Binary Tree Visualizer</h2>

      <div className="tree-container">{renderTree(root)}</div>

      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div
              className="bar-container barinfo"
              style={{ background: "#ff5252" }}
            ></div>
            <label>Current Node Height Check</label>
          </div>
        </div>
      </section>

      {result && (
        <div className="result">
          <h3>{result}</h3>
        </div>
      )}

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
            <label>Enter tree nodes (level order):</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="1,2,3,4,5,null,null"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>

          <div className="inner-btn">
            <button onClick={handleCheckBalanced}>
              Check Balanced
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalancedTree;
