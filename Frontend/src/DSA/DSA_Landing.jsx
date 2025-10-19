import React from 'react'
import { Link } from 'react-router-dom';
import './DSA_Landing.css'
function DSA_Landing() {


  return (
    <div className="continer-dsa">

      <div className="Algorithm">
          <h1>Select Algorithm to Visualize</h1>

          <div className="inner_Algorithm">
            <h3>Sorting Algorithms</h3>
            <Link to='/BubbleSort'><button>Bubble Sort</button></Link>
            <Link to='/SelectionSort'><button>Selection Sort</button></Link>
            <Link to='/InsertionSort'><button>Insertion Sort</button></Link>
            <Link to='/MergeSort'><button>Merge Sort</button></Link>
            <Link to='/QuickSort'><button>Quick Sort</button></Link>
            <Link to='/HeapSort'><button>Heap Sort</button></Link>
            <Link to='/CountingSort'><button>Counting Sort</button></Link>
            <Link to='/RadixSort'><button>Radix Sort</button></Link>
            <Link to='/ShellSort'><button>Shell Sort</button></Link>

            <hr />
            <h3>Searching Algorithms</h3>
            <Link to='/LinearSearch'><button>Linear Search</button></Link>
            <Link to='/BinarySearch'><button>Binary Search</button></Link>
            <Link to='/JumpSearch'><button>Jump Search</button></Link>
            <Link to='/InterpolationSearch'><button>Interpolation Search</button></Link>
            <Link to='/ExponentialSearch'><button>Exponential Search</button></Link>

            <hr />
            <h3>Graph Algorithms</h3>
            <Link to='/DFS'><button>DFS</button></Link>
            <Link to='/BFS'><button>BFS</button></Link>
            <Link to='/Dijkstra'><button>Dijkstra</button></Link>
            <Link to='/BellmanFord'><button>Bellman-Ford</button></Link>
            <Link to='/FloydWarshall'><button>Floyd-Warshall</button></Link>
            <Link to='/PrimMST'><button>Prim's MST</button></Link>
            <Link to='/KruskalMST'><button>Kruskal's MST</button></Link>

            <hr />
            <h3>Dynamic Programming Algorithms</h3>
            <Link to='/Knapsack'><button>0/1 Knapsack</button></Link>
            <Link to='/LCS'><button>LCS</button></Link>
            <Link to='/MatrixChain'><button>Matrix Chain Multiplication</button></Link>
            <Link to='/CoinChange'><button>Coin Change</button></Link>
          </div>

      </div>
  
    </div>
  )
}

export default DSA_Landing
