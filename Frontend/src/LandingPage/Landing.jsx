import {React,useEffect , useState} from "react";
import { Link } from 'react-router-dom';
import "./CodeAssistant.css";
import AOS from "aos";
import "aos/dist/aos.css";
import BOT from './img/—Pngtree—3d robots_18121577.png'
import Shutter from './img/shuttle.png'
import Algorithm from './img/algorithm.png'
import Chart from './img/chart.png'
import Machine from './img/machine-learning.png'
import Gears from './img/settings-gears.png'
import Bar from './img/bot2.png'
import Bot2 from './img/skill-development.png'
import Footer from '../Footer/Footer'
import { useNavigate } from "react-router-dom";


const randomReviews = [
  {
    name: "Chetan Kolhe",
    desc: "The platform made learning algorithms super easy and interactive.",
   
  },
  {
    name: "Abhi Sharma",
    desc: "I improved my problem-solving skills dramatically using this visualizer.",
   
  },
  {
    name: "Om Mahajan",
    desc: "Visualizing algorithms has never been this fun and intuitive.",
    
  },
  {
    name: "Vishal Kshirsagar",
    desc: "I loved being able to test my own inputs and see how the algorithm behaves.",
    
  },
  {
    name: "Shubham Bangar",
    desc: "Even complex algorithms feel simpler with this tool.",
   
  }
];



const Landing = ({isSidebarOpen}) => {
   const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  // Check if popup was already closed in this session
  const popupClosed = sessionStorage.getItem("popupClosed");

  if (!popupClosed) {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // show after 5 seconds

    return () => clearTimeout(timer);
  }
}, []);



  const handleClose = () => {
  setShowPopup(false);
  sessionStorage.setItem("popupClosed", "true"); // prevent reopening in this session
};

  const handleStartTest = () => {
    setShowPopup(false);
    navigate("/QuizGenerator"); // 🔗 go to test page
  };
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // animation lasts 1s
  }, []);
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";  // disable scroll
    } else {
      document.body.style.overflow = "auto";    // re-enable scroll
    }
  }, [isSidebarOpen]);
  
  const handleSubmit = () => {
    if (feedback.trim() !== "") {
      alert(`Feedback submitted: ${feedback}`);
      setFeedback("");
    }
  };
  return (
    <>
     {showPopup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>🧠 Test Your Coding Skills!</h2>
            <p>
              Challenge yourself with AI-generated coding questions and see how well you perform.
            </p>
            <div className="popup-actions">
              <button className="start-btn" onClick={handleStartTest}>
                Start Test 🚀
              </button>
              <button className="close-btn" onClick={handleClose}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    <div className="code-assistant">
    
      <header className="header">
        <h1 data-aos="zoom-in" >AI-Powered Code Assistant</h1>
        <p data-aos="zoom-in" >
          Elevate your coding with intelligent analysis, real-time assistance, algorithm visualization
          and actionable insights. Write better code, faster.
        </p>
        <div data-aos="zoom-in" className="btn-group">
       
                <Link to='/Services'>
                <button className="btn primary">
                    Get Started <i className="fa-solid fa-arrow-right"></i>
                </button>
                </Link>  
                
          
        </div>
        <div className="floating-icons">
          <img src={Shutter} alt="JS" className="float-item float1" />
          <img src={Machine} alt="Java" className="float-item float3" />
          <img src={Chart} alt="React" className="float-item float4" />
          <img src={Algorithm} alt="Security" className="float-item float5" />
         
        </div>
      </header>
      
     <section class="DSA-card-section" data-aos="zoom-out">
      <div class="scroll-frame">
        <div class="scroll-border left-border"></div>

        <div class="DSA-card-wrapper">
          <div class="DSA-card-track">
            <div class="DSA-card-set">
             <div class="card">
                <h3>Intuitive Graphs</h3>
                <p>Visualize trees, graphs, and linked lists with real-time animations that clarify traversal and structure.</p>
                <ul>
                  <li>Supports DFS, BFS, Dijkstra, and more with animated paths</li>
                  <li>Highlights node visits, edge weights, and recursion depth</li>
                  <li>Interactive zoom and pan for large data structures</li>
                </ul>
              </div>

              <div class="card">
                <h3>Step-by-Step Execution</h3>
                <p>Watch your code unfold line by line, making debugging and logic tracing effortless and educational.</p>
                <ul>
                  <li>Highlights current line, variable states, and stack frame</li>
                  <li>Great for teaching, learning, and debugging complex flow</li>
                </ul>
              </div>

              <div class="card">
                <h3>LeetCode Companion</h3>
                <p>Stuck on a problem? Plug it into the visualizer and see how your algorithm behaves across test cases.</p>
                <ul>
                  <li>Auto-generates edge cases for common patterns (e.g., sliding window, recursion)</li>
                  <li>Tracks time and space complexity in real time</li>
                  <li>Annotates logic transitions for better understanding</li>
                </ul>
              </div>

              <div class="card">
                <h3>Custom Input & Playback</h3>
                <p>Control the pace, input values, and even pause/resume to deeply understand algorithmic flow.</p>
                <ul>
                  <li>Supports manual and randomized input generation</li>
                  <li>Playback speed control for slow-motion debugging</li>
                  <li>Step forward/backward through execution history</li>

                </ul>
               
              </div>
                <div class="card">
                <h3>Intuitive Graphs</h3>
                <p>Visualize trees, graphs, and linked lists with real-time animations that clarify traversal and structure.</p>
                <ul>
                  <li>Supports DFS, BFS, Dijkstra, and more with animated paths</li>
                  <li>Highlights node visits, edge weights, and recursion depth</li>
                  <li>Interactive zoom and pan for large data structures</li>
                </ul>
              </div>

              <div class="card">
                <h3>Step-by-Step Execution</h3>
                <p>Watch your code unfold line by line, making debugging and logic tracing effortless and educational.</p>
                <ul>
                  <li>Highlights current line, variable states, and stack frame</li>
                  <li>Great for teaching, learning, and debugging complex flow</li>
                </ul>
              </div>

              <div class="card">
                <h3>LeetCode Companion</h3>
                <p>Stuck on a problem? Plug it into the visualizer and see how your algorithm behaves across test cases.</p>
                <ul>
                  <li>Auto-generates edge cases for common patterns (e.g., sliding window, recursion)</li>
                  <li>Tracks time and space complexity in real time</li>
                  <li>Annotates logic transitions for better understanding</li>
                </ul>
              </div>

              <div class="card">
                <h3>Custom Input & Playback</h3>
                <p>Control the pace, input values, and even pause/resume to deeply understand algorithmic flow.</p>
                <ul>
                  <li>Supports manual and randomized input generation</li>
                  <li>Playback speed control for slow-motion debugging</li>
                  <li>Step forward/backward through execution history</li>

                </ul>
               
              </div>
              
            </div>
          </div>
        </div>

        <div class="scroll-border right-border"></div>
      </div>
    </section>
    <section className="dsa-ai-section" data-aos="fade-left">
        <div className="ai-section">
        {/* Left card */}
        <div >
          <img src={Bar} className="ai-left" alt="" />
        </div>

        {/* Right content */}
        <div className="ai-right">
          <h2>Use AI Magic to understand your algorithms better</h2>
          <p>
            Want to see how your algorithm works? Our AI feature generates
            detailed explanations of your input — showing each step and helping
            you visualize the logic clearly.
          </p>
            <Link to='/dsa-visualizer'><button className="build-btn">⚡ Generate Explanation with AI</button></Link>
        </div>
      </div>
    </section>
    <section className="Bot">
        <div className="BotContainer">
            <div className="BotQuots" data-aos="fade-right">
                <h1>
                    I may be virtual, but my advice is real!   .
                    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="84"
        height="84"
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0,512) scale(0.1,-0.1)" fill="#000000">
<path d="M2673 5022 c-89 -32 -155 -94 -190 -183 -16 -40 -18 -91 -18 -589 l0
-545 26 -55 c53 -112 139 -171 262 -178 l77 -5 0 -118 0 -119 -585 0 -585 0 0
184 0 184 35 26 c75 57 135 185 135 286 0 108 -65 237 -151 300 -72 52 -143
72 -239 68 -72 -2 -96 -8 -152 -36 -230 -113 -276 -414 -91 -598 l53 -54 0
-199 0 -200 -52 -24 c-162 -75 -282 -222 -328 -401 l-18 -71 -163 -7 c-90 -3
-179 -11 -197 -17 -92 -28 -167 -96 -211 -191 l-26 -55 0 -340 0 -340 33 -67
c38 -77 92 -130 171 -166 51 -24 71 -27 225 -32 l168 -5 19 -73 c46 -182 158
-319 324 -399 134 -63 121 -63 1060 -63 932 0 925 0 1054 60 169 80 301 245
334 420 l12 60 73 0 73 0 -3 -333 -3 -334 -30 -48 c-22 -36 -45 -57 -84 -77
l-53 -28 -493 0 c-448 0 -494 2 -506 17 -26 31 -130 92 -197 115 -96 33 -258
33 -354 0 -185 -64 -287 -185 -288 -342 0 -95 29 -160 100 -230 176 -171 490
-185 696 -30 l64 49 527 3 c523 3 529 3 593 26 221 79 375 243 430 458 18 71
20 112 20 508 0 385 2 436 18 476 15 39 17 86 17 380 l0 335 -33 67 c-38 77
-92 130 -171 166 -52 24 -68 27 -227 30 l-171 4 -11 60 c-37 199 -204 380
-416 452 -17 6 0 27 109 136 l130 130 586 0 586 0 61 30 c68 35 115 82 146
149 21 45 21 58 21 606 l0 560 -24 47 c-30 61 -89 120 -149 150 l-47 23 -960
2 c-901 2 -963 1 -1012 -15z m1957 -154 c26 -14 53 -37 65 -58 19 -34 20 -51
20 -555 0 -507 -1 -521 -21 -555 -11 -19 -35 -45 -54 -57 l-33 -23 -600 0
-601 0 -206 -205 c-113 -113 -209 -205 -213 -205 -4 0 -7 83 -7 183 0 230 7
220 -155 227 -127 6 -155 18 -187 81 -16 31 -18 79 -18 553 0 514 0 519 22
557 13 24 37 46 62 59 40 20 58 20 961 20 l921 0 44 -22z m-3084 -757 c83 -38
143 -145 128 -229 -34 -188 -252 -257 -381 -121 -34 36 -63 104 -63 149 0 45
29 113 63 149 65 68 169 90 253 52z m-36 -726 l0 -155 -55 0 -55 0 0 155 0
155 55 0 55 0 0 -155z m1320 -349 c0 -53 22 -83 67 -92 30 -6 38 -1 103 61
l70 68 56 -6 c109 -11 239 -95 304 -197 71 -110 70 -102 70 -785 0 -574 -1
-617 -19 -674 -51 -163 -188 -282 -359 -311 -47 -7 -324 -10 -912 -8 -831 3
-846 3 -900 24 -30 12 -71 31 -90 42 -53 33 -134 117 -163 171 -55 100 -57
126 -57 752 0 334 4 598 10 628 34 180 199 337 380 360 36 5 374 9 753 10
l687 1 0 -44z m-1980 -951 l0 -445 -155 0 c-173 0 -213 11 -254 68 -37 53 -42
104 -39 402 3 282 3 285 28 328 14 25 42 54 65 68 38 22 49 24 198 24 l157 0
0 -445z m3143 431 c39 -16 82 -61 96 -99 7 -18 11 -142 11 -332 0 -190 -4
-314 -11 -332 -5 -15 -22 -41 -37 -56 -49 -52 -68 -57 -237 -57 l-155 0 0 445
0 445 150 0 c106 0 160 -4 183 -14z m67 -1715 c-34 -201 -202 -368 -400 -400
-38 -7 -245 -11 -502 -11 l-438 0 0 60 0 59 483 3 482 3 60 32 c73 38 134 100
172 173 l28 55 5 354 5 354 48 12 c26 7 51 15 55 19 12 13 14 -642 2 -713z
m-1740 -141 c165 -27 267 -129 245 -246 -9 -52 -85 -125 -161 -154 -83 -32
-215 -33 -298 0 -63 24 -129 77 -152 121 -18 36 -18 102 0 138 33 64 131 125
225 141 66 11 69 11 141 0z"/>
<path d="M2985 4704 c-36 -18 -82 -61 -98 -89 -19 -35 -25 -94 -15 -142 13
-57 78 -126 134 -142 55 -15 1264 -15 1319 0 75 21 145 115 145 195 0 63 -51
144 -110 174 -38 19 -60 20 -692 20 -572 0 -657 -2 -683 -16z m1320 -158 c20
-30 7 -63 -28 -71 -12 -3 -296 -4 -630 -3 -527 3 -609 5 -617 18 -15 24 -12
58 8 69 11 7 234 10 634 11 l618 0 15 -24z"/>
<path d="M2985 4164 c-36 -18 -82 -61 -98 -89 -19 -35 -25 -94 -15 -142 13
-57 78 -126 134 -142 55 -15 1264 -15 1319 0 75 21 145 115 145 195 0 63 -51
144 -110 174 -38 19 -60 20 -692 20 -572 0 -657 -2 -683 -16z m1320 -158 c20
-30 7 -63 -28 -71 -12 -3 -296 -4 -630 -3 -527 3 -609 5 -617 18 -15 24 -12
58 8 69 11 7 234 10 634 11 l618 0 15 -24z"/>
<path d="M1627 2770 c-108 -19 -207 -95 -255 -198 -22 -47 -27 -71 -27 -142 0
-73 4 -93 28 -142 105 -213 379 -268 545 -110 28 26 63 72 78 102 26 49 29 65
29 150 0 85 -3 101 -28 148 -57 108 -139 171 -251 191 -33 6 -62 10 -65 10 -3
-1 -27 -5 -54 -9z m130 -161 c64 -24 123 -109 123 -179 0 -79 -74 -172 -145
-186 -131 -24 -238 59 -238 185 0 81 34 137 108 175 35 18 111 21 152 5z"/>
<path d="M2750 2766 c-266 -57 -363 -385 -171 -577 68 -67 143 -100 235 -100
106 -1 183 30 253 103 166 172 115 449 -102 548 -73 34 -142 42 -215 26z m153
-162 c45 -23 66 -44 88 -86 36 -70 18 -181 -37 -229 -66 -58 -169 -65 -242
-17 -116 77 -105 265 20 327 52 25 126 28 171 5z"/>
<path d="M1562 1883 c-31 -12 -43 -60 -32 -130 30 -194 185 -352 376 -383 77
-13 621 -13 699 0 190 31 348 192 374 380 9 70 2 105 -27 126 -14 11 -154 13
-697 13 -374 0 -686 -3 -693 -6z m1253 -165 c-18 -61 -83 -135 -150 -171 -39
-21 -52 -22 -395 -25 -389 -3 -395 -3 -479 58 -38 28 -101 119 -101 148 0 9
120 12 566 12 l565 0 -6 -22z"/>
</g>
</svg>
                </h1>
                <p>“Instant insights, powered by intelligence , Ask Anything (Chatbot)</p>
            </div>
            <Link to='/Chatbot'>
                <button className="btn primary">
                    Ask Me  <i className="fa-solid fa-arrow-right"></i>
                </button>
                </Link>  
      
        </div>
    </section>
    <section className="test-section" data-aos="fade-up">
  <div className="test-container">
    <div className="test-content">
      <h2>Test Your Coding Skills</h2>
      <p>
        Challenge yourself with AI-generated coding questions designed to improve your problem-solving and logic-building skills.
        Track your performance and grow with every attempt!
      </p>
      <button className="test-btn" onClick={() => navigate("/QuizGenerator")}>
        Start Test 🚀
      </button>
    </div>
   
      <div className="test-image">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="currentColor"
          stroke="none"
        >
        <path d="M2445 5085 l-25 -24 0 -286 0 -286 25 -24 c29 -30 74 -32 106 -6 l24
        19 0 297 0 297 -24 19 c-32 26 -77 24 -106 -6z"/>
        <path d="M3683 4317 c-180 -180 -203 -207 -203 -236 0 -43 38 -81 82 -81 29 0
        54 22 235 203 181 181 203 206 203 235 0 44 -38 82 -81 82 -29 0 -56 -23 -236
        -203z"/>
        <path d="M1699 4297 c-114 -39 -201 -115 -254 -220 l-25 -51 -68 -4 c-251 -13
        -467 -225 -496 -487 -6 -53 5 -169 20 -208 3 -9 -17 -27 -62 -53 -125 -73
        -231 -218 -269 -369 -19 -76 -19 -234 0 -310 27 -108 82 -203 159 -281 39 -39
        95 -84 124 -100 43 -23 52 -33 47 -49 -37 -128 -26 -256 34 -380 87 -182 243
        -290 449 -310 62 -7 71 -10 76 -30 3 -13 22 -44 42 -70 19 -26 34 -48 32 -50
        -2 -1 -21 -12 -43 -23 -90 -45 -145 -128 -153 -228 -6 -85 3 -124 43 -182 31
        -46 33 -52 18 -64 -33 -27 -63 -110 -63 -174 0 -167 108 -280 281 -291 l77 -6
        6 -51 c14 -110 92 -217 194 -264 l57 -27 380 0 380 0 67 33 c105 51 174 148
        185 257 l6 52 76 6 c92 6 135 23 191 73 107 97 127 260 45 369 -26 34 -31 46
        -21 54 7 6 26 34 41 63 25 44 29 64 29 123 -1 149 -106 269 -247 283 l-49 5 7
        56 c19 160 78 327 161 453 27 41 109 134 189 214 240 241 350 434 412 724 28
        133 25 404 -6 530 -106 429 -398 770 -797 929 -170 68 -388 100 -452 67 -36
        -19 -78 -65 -91 -99 -8 -20 -11 -471 -11 -1453 l0 -1424 -110 0 -111 0 36 52
        c20 29 44 82 55 117 19 61 20 96 20 1245 0 1272 1 1235 -51 1338 -28 54 -113
        143 -167 175 -112 66 -270 82 -393 40z m1088 -163 c364 -90 665 -373 788 -738
        49 -147 59 -210 58 -391 0 -151 -3 -181 -26 -268 -30 -111 -95 -255 -158 -348
        -23 -35 -117 -141 -208 -234 -122 -125 -179 -192 -214 -251 -93 -156 -146
        -309 -168 -486 l-12 -88 -133 0 -134 0 0 1413 c0 778 3 1416 6 1420 10 9 100
        -4 201 -29z m-802 -2 c67 -32 117 -83 149 -151 21 -46 21 -47 21 -1231 l0
        -1185 -26 -55 c-53 -114 -151 -175 -279 -174 -125 1 -208 51 -261 159 -56 113
        -39 221 42 272 57 36 69 51 69 86 0 43 -31 77 -71 77 -95 0 -212 -129 -226
        -252 l-6 -50 -44 7 c-205 30 -333 175 -333 375 0 172 94 305 257 361 72 25
        103 53 103 91 0 38 -40 78 -78 78 -71 0 -196 -67 -289 -156 l-58 -55 -35 16
        c-138 66 -229 223 -230 395 0 144 41 248 133 341 73 72 162 113 258 118 91 4
        144 -15 211 -77 54 -49 79 -57 116 -38 56 29 58 87 5 141 -80 83 -203 135
        -318 135 l-63 0 -11 50 c-16 72 -14 109 9 181 51 162 200 271 372 272 69 1 84
        -3 153 -37 62 -31 85 -49 126 -102 54 -67 79 -81 120 -66 33 13 52 37 52 67 0
        63 -117 191 -220 242 -60 29 -60 33 5 105 83 92 227 116 347 60z m1105 -2977
        c35 -18 60 -62 60 -105 0 -17 -7 -44 -15 -60 -32 -62 0 -60 -836 -60 l-761 0
        -34 34 c-30 30 -34 41 -34 84 0 53 24 96 64 112 11 5 360 9 774 9 654 1 757
        -1 782 -14z m-15 -399 c40 -17 75 -68 75 -109 0 -40 -26 -85 -63 -107 -31 -19
        -56 -20 -775 -20 -668 0 -748 2 -778 16 -67 32 -86 126 -37 184 14 18 36 36
        47 40 12 5 353 9 759 9 620 1 743 -1 772 -13z m-292 -428 c-10 -55 -46 -109
        -89 -134 l-42 -25 -354 3 -355 3 -36 28 c-41 31 -77 93 -77 132 l0 25 480 0
        480 0 -7 -32z"/>
        <path d="M2756 3947 c-27 -27 -33 -65 -17 -96 6 -10 63 -44 128 -76 106 -53
        128 -69 214 -154 59 -59 112 -123 137 -166 59 -101 101 -235 112 -356 7 -84
        12 -105 31 -125 28 -30 68 -31 104 -2 l28 22 -6 105 c-19 341 -235 665 -544
        817 -121 59 -153 64 -187 31z"/>
        <path d="M3941 3064 c-12 -15 -21 -37 -21 -49 0 -12 9 -34 21 -49 l20 -26 295
        0 c281 0 295 1 314 20 12 12 20 33 20 55 0 22 -8 43 -20 55 -19 19 -33 20
        -314 20 l-295 0 -20 -26z"/>
        <path d="M3530 2027 c-33 -16 -55 -57 -47 -88 3 -13 98 -116 211 -228 199
        -198 206 -204 238 -197 41 8 68 39 68 80 0 27 -25 56 -202 233 -112 110 -212
        204 -223 207 -11 3 -31 0 -45 -7z"/>
        </g>
      </svg>
    </div>
  </div>
</section>

      <section className="features-grid">
        <div className="features-track">
  <div data-aos="fade-right" className="feature-card blue">
    <h1><i class="fa-brands fa-slack"></i></h1>
    <h3>DSA Visualizer</h3>
    <p>Searching , Sorting , Tree , Graph :-  Algorithm Visualizer.</p>
    
  </div>
  <div data-aos="zoom-in" className="feature-card green">
    <h1><i class="fa-solid fa-code"></i></h1>
    <h3>Code Quality Analysis</h3>
    <p>Get detailed insights into code quality, maintainability, and best practices.</p>
    
  </div>
  <div data-aos="fade-left" className="feature-card orange">
    <h1><i class="fa-solid fa-comments"></i></h1>
    <h3>AI Chat Assistant</h3>
    <p>Ask questions about code, get explanations, and solve programming problems.</p>
  </div>
  <div data-aos="fade-right" className="feature-card pink">
    <h1><i class="fa-solid fa-bug"></i></h1>
    <h3>Bug Detection</h3>
    <p>AI-powered bug detection and prevention recommendations.</p>
  </div>
  <div data-aos="zoom-in" className="feature-card purple">
    <h1><i class="fa-solid fa-square-poll-horizontal"></i></h1>
    <h3>Analytics Dashboard</h3>
    <p>Track your coding patterns and improvement over time with data insights.</p>
  </div>
  <div data-aos="fade-left" className="feature-card cyan">
    <h1><i class="fa-solid fa-shield-halved"></i></h1>
    <h3>Security Scanning</h3>
    <p>Identify potential security vulnerabilities and get recommendations.</p>
    
    </div>
  </div>
</section>
<section className="ReviewSection" data-aos="fade-up">
      <h2>User's Feedback</h2>
      <p>We value feedback and continuously improve based on your experience!</p>

      <div className="scroll-frame">
        <div className="DSA-card-wrapper">
          <div className="DSA-card-track">
            <div className="DSA-card-set">
              {randomReviews.map((review, idx) => (
                <div className="card" key={idx}>
                  <h3>{review.name}</h3>
                  <p>{review.desc}</p>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="AddFeedback" style={{display:"none"}}>
        <form className="input-section">
          <div className="input">
            <input type="text" placeholder="Enter your Name" />
            <input
              type="text"
              placeholder="Add Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className="btn">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>

    <section className="contact-section" data-aos="fade-up">
        <h2>📩 Contact Us</h2>
        <p>Have questions, feedback, or collaboration ideas? We’d love to hear from you!</p>

        <div className="contact-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()} data-aos="fade-right">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Write your message..." required></textarea>
            </div>

            <button type="submit" className="contact-btn">
              Send Message <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>

          <div className="contact-info" data-aos="fade-left">
            <h3>Get in Touch</h3>
            <p><i className="fa-solid fa-envelope"></i> support@aicodeassistant.com</p>
            <p><i className="fa-solid fa-phone"></i> +91 98765 43210</p>
            <p><i className="fa-solid fa-location-dot"></i> Pune, Maharashtra, India</p>
            <div className="social-icons">
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-facebook"></i>
            
            </div>
          </div>
        </div>
      </section>


    
    </div>
    <Footer/>
    </>
  );
};

export default Landing;
