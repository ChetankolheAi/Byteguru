import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const LCAVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [nodeA, setNodeA] = useState("");
  const [nodeB, setNodeB] = useState("");
  const [highlightNode, setHighlightNode] = useState(null);
  const [result, setResult] = useState("");
  const [speed, setSpeed] = useState(300);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Default Tree
  useEffect(() => {
    const defaultArr = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];
    setRoot(buildTree(defaultArr));
  }, []);

  // Build Tree (level order)
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

  // 🔥 LCA Logic with animation (Binary Tree)
  const findLCA = async (node, p, q) => {
    if (!node) return null;

    setHighlightNode(node.val);
    await new Promise((r) =>
      setTimeout(r, 1150 - speedRef.current)
    );

    if (node.val === p || node.val === q) return node;

    const left = await findLCA(node.left, p, q);
    const right = await findLCA(node.right, p, q);

    if (left && right) return node;

    return left ? left : right;
  };

  const handleFindLCA = async () => {
    if (!root || nodeA === "" || nodeB === "") return;

    setResult("");
    setHighlightNode(null);

    const lca = await findLCA(
      root,
      parseInt(nodeA),
      parseInt(nodeB)
    );

    setHighlightNode(null);
    setResult(
      lca
        ? `✅ LCA is Node ${lca.val}`
        : "❌ LCA not found"
    );
  };

  // Render Tree
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
      <h2>Lowest Common Ancestor Visualizer</h2>

      <div className="tree-container">{renderTree(root)}</div>

      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div
              className="bar-container barinfo"
              style={{ background: "#ff5252" }}
            ></div>
            <label>Current Node Check</label>
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
            <label>Enter Tree (level order):</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="3,5,1,6,2,0,8,null,null,7,4"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>

          <div className="input-array">
            <label>Node A:</label>
            <input
              type="number"
              value={nodeA}
              onChange={(e) => setNodeA(e.target.value)}
              placeholder="5"
            />
          </div>

          <div className="input-array">
            <label>Node B:</label>
            <input
              type="number"
              value={nodeB}
              onChange={(e) => setNodeB(e.target.value)}
              placeholder="1"
            />
          </div>

          <div className="inner-btn">
            <button onClick={handleFindLCA}>
              Find LCA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LCAVisualizer;
