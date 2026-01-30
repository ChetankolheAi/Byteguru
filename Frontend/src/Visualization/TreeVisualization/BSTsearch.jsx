import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const BSTsearch= () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [target, setTarget] = useState("");
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



  // Default BST
  useEffect(() => {
    const defaultArr = [8, 3, 10, 1, 6, null, 14, null, null, 4, 7, 13];
    setRoot(buildTree(defaultArr));
  }, []);



  // Build BST from level-order input
  const buildTree = (arr) => {
    if (!arr.length) return null;
    const nodes = arr.map((v) => (v !== null ? new TreeNode(v) : null));
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

  //BST Search with animation
  const searchBST = async (node, value) => {
    if (!node) return false;

    setHighlightNode(node.val);
    await new Promise((r) =>
      setTimeout(r, 1150 - speedRef.current)
    );

    if (node.val === value) return true;

    if (value < node.val) return await searchBST(node.left, value);
    return await searchBST(node.right, value);
  };

  const handleSearch = async () => {
    if (!root || target === "") return;

    setResult("");
    setHighlightNode(null);

    const found = await searchBST(root, parseInt(target));

    setHighlightNode(null);
    setResult(
      found
        ? `✅ Value ${target} found in BST`
        : `❌ Value ${target} not found`
    );
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
      <h2>BST Search Visualizer</h2>

      <div className="tree-container">{renderTree(root)}</div>

      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div
              className="bar-container barinfo"
              style={{ background: "#ff5252" }}
            ></div>
            <label>Current Search Node</label>
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
            <label>Enter BST (level order):</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="8,3,10,1,6,null,14,null,null,4,7,13"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>

          <div className="input-array">
            <label>Search Value:</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="6"
            />
          </div>

          <div className="inner-btn">
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BSTsearch;
