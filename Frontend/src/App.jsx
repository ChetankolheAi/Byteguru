import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer , Slide} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Chatbot from './Pages/Chatbot/Chatpage';
import SideBar from './Navbar/SideBar/SideBar';
import Login from './Login/Login';
import Signup from './Signup/Signup'
import History from './History/History'
import AboutUs from './Pages/AboutUs/AboutUs';
import Navbar from './Navbar/navbar';
import Ide from './Ide/Ide'
import Landing from './LandingPage/Landing'
import { API_URL } from "./utils";
import Footer from './Footer/Footer'

import DSA from './LandingPage/DSA/DSA_Landing'
import Services from './Services/Services'


//sorting
import BubbleSorting from './Visualization/SortingVisualization/BubbleSorting';
import InsertionSort from './Visualization/SortingVisualization/Insertionsort';
import MergeSort from './Visualization/SortingVisualization/MergeSort';
import SelectionSort from './Visualization/SortingVisualization/SelectionSort';
import QuickSort from './Visualization/SortingVisualization/QuickSort';

//Tree
import TreeHeightVisualizer from './Visualization/TreeVisualization/TreeHeightDiameterVisualizer';
import TreeTraversalVisualizer from './Visualization/TreeVisualization/TreeTraversalVisualizer ';

//Graph
import GraphVisualizer from './Visualization/GraphVisualization/GraphVisualizer';


import QuizGenerator from './QuizPages/Quizegenerator';


import ProfilePage from './ProfilePage/ProfilePage';
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userid, setuserid] = useState("");
  const [firstname, srtFirstname] = useState("");
  const [email, setemail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {

    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
 
  useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setuserid("");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setuserid("");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setuserid(data.user._id);
        srtFirstname(data.user.firstname);
        setemail(data.user.email);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };
  fetchUser();
  window.addEventListener("storage", fetchUser);

  return () => window.removeEventListener("storage", fetchUser);
}, []);

  return (
    <Router>
      <SideBar isOpen={isSidebarOpen} 
      
      toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div
       style={{
        marginLeft:
          window.innerWidth > 1000 ? (isSidebarOpen ? '200px' : '0') : '0',
        transition: 'margin-left 0.3s ease',
      }}

      >
        <Navbar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
          <ToastContainer transition={Slide} /> 
      
        <Routes>
          {/* <Route path="/" element={<Home userid={userid} firstname={firstname}/>} /> */}
          <Route path="/" element={<Landing  isSidebarOpen={isSidebarOpen}/>}/>
          <Route path="/Chatbot" element={<Chatbot  userid={userid} firstname={firstname}/>} />
          <Route path="/History" element={<History userid={userid} isAuthenticated={isAuthenticated} />} />
          <Route path="/Aboutus" element={<AboutUs isSidebarOpen={isSidebarOpen}/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/code-analyzer" element={<Ide />} />
        
          <Route path="/dsa-visualizer" element={<DSA />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/BubbleSort" element={<BubbleSorting />} />
          <Route path="/InsertionSort" element={<InsertionSort />} />
          <Route path="/MergeSort" element={<MergeSort />} />
          <Route path="/SelectionSort" element={<SelectionSort />} />
          <Route path="/QuickSort" element={<QuickSort />} />
      
          <Route path="/TreeHeightVisualizer" element={<TreeHeightVisualizer />} />
          <Route path="/TreeTraversalVisualizer" element={<TreeTraversalVisualizer />} />

          <Route path="/GraphVisualizer" element={<GraphVisualizer />} />

          <Route path="/QuizGenerator" element={<QuizGenerator userid={userid} />} />
         
         <Route path="/Profile" element={<ProfilePage userid={userid} firstname={firstname} email={email} isAuthenticated={isAuthenticated}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
