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
import Java from './img/java.png'
import Footer from '../Footer/Footer'

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
    <div className="code-assistant">
    
      <header className="header">
        <h1 data-aos="zoom-in" >AI-Powered Code Assistant</h1>
        <p data-aos="zoom-in" >
          Elevate your coding with intelligent analysis, real-time assistance,
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
    <section className="Bot">
        <div className="BotContainer">
            <div className="BotQuots" data-aos="fade-right">
                <h1>
                    I may be virtual, but my advice is real! (Chatbot)
                </h1>
                <p>“Instant insights, powered by intelligence</p>
            </div>
            <Link to='/Chatbot'>
                <button className="btn primary">
                    Ask Me  <i className="fa-solid fa-arrow-right"></i>
                </button>
                </Link>  
      
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
