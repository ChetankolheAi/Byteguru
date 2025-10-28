import {React,useEffect} from 'react'
import { Link } from 'react-router-dom';
import './DSA_Landing.css'
import Footer from '../../Footer/Footer'
function DSA_Landing() {

  // After successful login
useEffect(() => {
  // Enable scrolling
  document.body.style.overflow = "auto";

  // Optional: cleanup if component unmounts
  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
    <>
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
            <h3>Tree Algorithms</h3>
            <Link to='/TreeTraversalVisualizer'><button>Tree Traversals (In,Pre,Post)</button></Link>
            <Link to='/TreeHeightVisualizer'><button>Tree Height</button></Link>
            <Link to='/BSTInsertion'><button>BST Insertion</button></Link>
            <Link to='/BSTSearch'><button>BST Search</button></Link>
            <Link to='/LowestCommonAncestor'><button>Lowest Common Ancestor</button></Link>
            <Link to='/LevelOrderTraversal'><button>Level Order Traversal (BFS)</button></Link>
            <Link to='/DiameterOfTree'><button>Diameter of Tree</button></Link>
            <Link to='/BalanceCheck'><button>Check if Tree is Balanced</button></Link>
            
            
            <hr />
            <h3>Graph Algorithms</h3>
            <Link to='/GraphVisualizer'><button>DFS</button></Link>
            <Link to='/BFS'><button>BFS</button></Link>
            <Link to='/Dijkstra'><button>Dijkstra</button></Link>
            <Link to='/BellmanFord'><button>Bellman-Ford</button></Link>
            <Link to='/FloydWarshall'><button>Floyd-Warshall</button></Link>
            <Link to='/PrimMST'><button>Prim's MST</button></Link>
            <Link to='/KruskalMST'><button>Kruskal's MST</button></Link>


          </div>

      </div>
  
    </div>
    <Footer/>
    </>
   
  )
}

export default DSA_Landing
