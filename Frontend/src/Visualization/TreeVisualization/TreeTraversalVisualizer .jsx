import React, { useState, useEffect, useRef } from "react";
import "./TreeVisualizer.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const TreeTraversalVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [highlightNode, setHighlightNode] = useState(null);
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [traversal, setTraversalType] = useState("");
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
    let root = nodes[0];
    let j = 1;
    for (let i = 0; i < nodes.length && j < nodes.length; i++) {
      if (nodes[i]) {
        nodes[i].left = nodes[j++] || null;
        nodes[i].right = nodes[j++] || null;
      }
    }
    return root;
  };

  const handleSetTree = () => {
    if (!userInput.trim()) return;
    const arr = userInput
      .split(",")
      .map((v) => (v.trim() === "null" ? null : parseInt(v.trim())));
     if (window.innerWidth < 700 && arr.length > 15) {
        alert("Maximum 15 nodes allowed on Medium screens!");
        return;
    }
    else if (window.innerWidth < 500 && arr.length > 7) {
        alert("Maximum 7 nodes allowed on small screens!");
        return;
    }
    setRoot(buildTree(arr));
    setTraversalOrder([]);
    setHighlightNode(null);
  };

  // Traversals
  const inorder = async (node, result = []) => {
    if (!node) return;
    await inorder(node.left, result);
    setHighlightNode(node.val);
    result.push(node.val);
    setTraversalOrder([...result]);
    await new Promise((r) => setTimeout(r, 1150-speedRef.current));
    await inorder(node.right, result);
  };

  const preorder = async (node, result = []) => {
    if (!node) return;
    setHighlightNode(node.val);
    result.push(node.val);
    setTraversalOrder([...result]);
    await new Promise((r) => setTimeout(r, 1150-speedRef.current));
    await preorder(node.left, result);
    await preorder(node.right, result);
  };

  const postorder = async (node, result = []) => {
    if (!node) return;
    await postorder(node.left, result);
    await postorder(node.right, result);
    setHighlightNode(node.val);
    result.push(node.val);
    setTraversalOrder([...result]);
    await new Promise((r) => setTimeout(r, 1150-speedRef.current));
  };

  const handleTraversal = async (type) => {
    if (!root) return;
    setTraversalOrder([]);
    setHighlightNode(null);

    if (type === "inorder"){

        await inorder(root);
        setTraversalType("Inorder");
    }   
    else if (type === "preorder"){
        await preorder(root);
        setTraversalType("Preorder");
    } 
    else if (type === "postorder"){
        await postorder(root);
        setTraversalType("Postorder");
    } 

    setHighlightNode(null);
  };

  // Render tree recursively
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
      <h2>Binary Tree Traversal Visualizer</h2>

      <div className="tree-container">{renderTree(root)}</div>
      
      <section className="info">
        <div className="info-section">
          <div className="sec1">
            <div
              className="bar-container barinfo"
              style={{ background: "#ff5252" }}
            ></div>
            <label>Current Node Traversal</label>
          </div>
        </div>
      </section>
      {traversalOrder.length > 0 && (
        <div className="result">
          <h3>{traversal} Traversal:</h3>
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
            <label>Enter tree nodes (comma separated): </label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="e.g. 1,2,3,4,5,null,7"
            />
            <button onClick={handleSetTree}>Set Tree</button>
          </div>

          <div className="inner-btn">
            <button onClick={() => handleTraversal("inorder")}>Inorder</button>
            <button onClick={() => handleTraversal("preorder")}>Preorder</button>
            <button onClick={() => handleTraversal("postorder")}>Postorder</button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default TreeTraversalVisualizer;
