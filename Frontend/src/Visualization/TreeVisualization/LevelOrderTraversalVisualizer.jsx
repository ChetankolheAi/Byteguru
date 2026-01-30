import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const LevelOrderTraversalVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [highlightNode, setHighlightNode] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [speed, setSpeed] = useState(300);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Default tree
  useEffect(() => {
    const defaultArr = [1, 2, 3, 4, 5, null, 7];
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
    setTraversalOrder([]);
    setHighlightNode(null);
  };

  //BFS / Level Order Traversal
  const levelOrderTraversal = async () => {
    if (!root) return;

    const queue = [root];
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();

      setHighlightNode(node.val);
      result.push(node.val);
      setTraversalOrder([...result]);

      await new Promise((r) =>
        setTimeout(r, 1150 - speedRef.current)
      );

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    setHighlightNode(null);
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


  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return (
    <div className="visualizer">
      <h2>Level Order Traversal (BFS)</h2>

      <div className="tree-container">{renderTree(root)}</div>

      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div
              className="bar-container barinfo"
              style={{ background: "#ff5252" }}
            ></div>
            <label>Current BFS Node</label>
          </div>
        </div>
      </section>

      {traversalOrder.length > 0 && (
        <div className="result">
          <h3>Level Order Traversal:</h3>
          <p>{traversalOrder.join(" → ")}</p>
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
              placeholder="1,2,3,4,5,null,7"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>

          <div className="inner-btn">
            <button onClick={levelOrderTraversal}>
              Level Order (BFS)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelOrderTraversalVisualizer;
