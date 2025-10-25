import React, { useEffect, useRef, useState } from "react";
import "./GraphVisualizer.css";

const defaultRows = 10;
const defaultCols = 10;

const GraphGridVisualizerSVG = ({ rows = defaultRows, cols = defaultCols }) => {
  const [start, setStart] = useState([0, 0]);
  const [visited, setVisited] = useState(new Set());
  const [speed, setSpeed] = useState(300); // lower = faster
  const speedRef = useRef(speed);
  const [mode, setMode] = useState(""); // "BFS" or "DFS"
  const runningRef = useRef(false);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // helper: key for a node
  const key = (r, c) => `${r}-${c}`;

  // neighbors (4-directional grid)
  const getNeighbors = (r, c) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    const res = [];
    for (const [dr, dc] of dirs) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) res.push([nr, nc]);
    }
    return res;
  };

  // sleep helper
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // BFS
  const bfs = async (sr, sc) => {
    runningRef.current = true;
    const queue = [[sr, sc]];
    const vis = new Set();

    while (queue.length > 0 && runningRef.current) {
      const [r, c] = queue.shift();
      const k = key(r, c);
      if (vis.has(k)) continue;
      vis.add(k);
      setVisited(new Set(vis));
      await sleep(Math.max(20, 800 - speedRef.current)); // clamp minimum pause

      for (const [nr, nc] of getNeighbors(r, c)) {
        const nk = key(nr, nc);
        if (!vis.has(nk)) queue.push([nr, nc]);
      }
    }
    runningRef.current = false;
  };

  // DFS (iterative stack to avoid potential call-stack issues)
  const dfs = async (sr, sc) => {
    runningRef.current = true;
    const stack = [[sr, sc]];
    const vis = new Set();

    while (stack.length > 0 && runningRef.current) {
      const [r, c] = stack.pop();
      const k = key(r, c);
      if (vis.has(k)) continue;
      vis.add(k);
      setVisited(new Set(vis));
      await sleep(Math.max(20, 800 - speedRef.current));

      // push neighbors in reverse order so traversal order is natural (up,right,down,left)
      const neighbors = getNeighbors(r, c);
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const [nr, nc] = neighbors[i];
        const nk = key(nr, nc);
        if (!vis.has(nk)) stack.push([nr, nc]);
      }
    }
    runningRef.current = false;
  };

  const handleTraversal = async (type) => {
    if (runningRef.current) {
      // stop current traversal
      runningRef.current = false;
      return;
    }

    // start fresh
    setVisited(new Set());
    setMode(type.toUpperCase());
    await sleep(50);

    const [sr, sc] = start;
    if (type === "bfs") {
      await bfs(sr, sc);
    } else {
      await dfs(sr, sc);
    }
    setMode("");
  };

  const cellSize = 40; // px
  const padding = 20;
  const svgWidth = cols * cellSize + padding * 2;
  const svgHeight = rows * cellSize + padding * 2;

  // helper to compute cell center coords
  const center = (r, c) => {
    const x = padding + c * cellSize + cellSize / 2;
    const y = padding + r * cellSize + cellSize / 2;
    return [x, y];
  };

  const isVisited = (r, c) => visited.has(key(r, c));
  const isStart = (r, c) => start[0] === r && start[1] === c;

  // draw edges between centers (optional subtle lines)
  const edges = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const nbrs = getNeighbors(r, c);
      const [x1, y1] = center(r, c);
      for (const [nr, nc] of nbrs) {
        // only draw edge once (r,c) -> (nr,nc) where key < neighbor key
        if (key(r, c) < key(nr, nc)) {
          const [x2, y2] = center(nr, nc);
          edges.push({ x1, y1, x2, y2 });
        }
      }
    }
  }

  return (
    <div className="svg-visualizer">
      <h2>SVG Grid Graph Traversal (BFS / DFS)</h2>

      <div className="controls">
        <div className="control-row">
          <label>Speed</label>
          <input
            type="range"
            min="50"
            max="900"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
          <span className="speed-value">{speed}ms</span>
        </div>

        <div className="control-row">
          <button onClick={() => handleTraversal("bfs")}>
            {runningRef.current ? "Stop" : "BFS"}
          </button>
          <button onClick={() => handleTraversal("dfs")}>
            {runningRef.current ? "Stop" : "DFS"}
          </button>
          <button
            onClick={() => {
              runningRef.current = false;
              setVisited(new Set());
            }}
          >
            Reset
          </button>
        </div>

        <div className="control-row small-text">
          <span>Click any cell to set the start node. Current: [{start[0]}, {start[1]}]</span>
          {mode && <span className="mode-badge">{mode}</span>}
        </div>
      </div>

      <svg
        className="grid-svg"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* edges */}
        <g className="edges" stroke="#cfcfcf" strokeWidth="2">
          {edges.map((e, idx) => (
            <line
              key={idx}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              strokeOpacity="0.35"
            />
          ))}
        </g>

        {/* cells */}
        <g className="cells">
          {Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => {
              const [cx, cy] = center(r, c);
              const visitedNow = isVisited(r, c);
              const startNow = isStart(r, c);
              const rectX = cx - cellSize / 2;
              const rectY = cy - cellSize / 2;
              return (
                <g
                  key={`${r}-${c}`}
                  className="cell-group"
                  transform={`translate(0,0)`}
                  onClick={() => {
                    if (runningRef.current) return; // prevent changing mid-run
                    setStart([r, c]);
                    setVisited(new Set());
                  }}
                  style={{ cursor: runningRef.current ? "not-allowed" : "pointer" }}
                >
                  <rect
                    x={rectX}
                    y={rectY}
                    width={cellSize - 4}
                    height={cellSize - 4}
                    rx="6"
                    ry="6"
                    fill={startNow ? "#ff9800" : visitedNow ? "#4caf50" : "#f5f5f5"}
                    stroke={startNow ? "#e65100" : "#bdbdbd"}
                    strokeWidth={startNow ? 2.5 : 1.2}
                    transform={`translate(${2}, ${2})`}
                  />
                  {/* subtle pulse circle for current visited */}
                  {visitedNow && !startNow && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill="#ffffff"
                      opacity="0.15"
                      className="visited-pulse"
                    />
                  )}

                  <text
                    x={cx}
                    y={cy + 4}
                    fontSize="11"
                    textAnchor="middle"
                    fill={startNow ? "#fff" : "#333"}
                    style={{ pointerEvents: "none", fontFamily: "Inter, Arial" }}
                  >
                    {r * cols + c}
                  </text>
                </g>
              );
            })
          )}
        </g>
      </svg>
    </div>
  );
};

export default GraphGridVisualizerSVG;
