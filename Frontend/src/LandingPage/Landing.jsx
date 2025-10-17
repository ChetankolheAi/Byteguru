import {React,useEffect} from "react";
import "./CodeAssistant.css";
import AOS from "aos";
import "aos/dist/aos.css";
import BOT from './—Pngtree—3d robots_18121577.png'
import Footer from '../Footer/Footer'

const Landing = ({isSidebarOpen}) => {
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
          <button className="btn primary">Get Started <i class="fa-solid fa-arrow-right"></i></button>
          
        </div>
      </header>

    <section className="Bot">
        <div className="BotContainer">
            <div className="BotQuots" data-aos="fade-right">
                <h1>
                    I may be virtual, but my advice is real!
                </h1>
                <p>“Instant insights, powered by intelligence</p>
            </div>
        <img  data-aos="fade-left" src={BOT} alt="" />
        </div>
    </section>
      <section  className="features-grid">
        <div  data-aos="fade-right" className="feature-card blue">
          <h3>💻 Code Quality Analysis</h3>
          <p>
            Get detailed insights into code quality, maintainability, and best
            practices.
          </p>
        </div>
        <div data-aos="zoom-in" className="feature-card green">
          <h3>🛡️ Security Scanning</h3>
          <p>
            Identify potential security vulnerabilities and get recommendations.
          </p>
        </div>
        <div data-aos="fade-left" className="feature-card orange">
          <h3>⚡ Performance Optimization</h3>
          <p>
            Analyze code performance and get optimization suggestions.
          </p>
        </div>
        <div data-aos="fade-right" className="feature-card pink">
          <h3>🐞 Bug Detection</h3>
          <p>AI-powered bug detection and prevention recommendations.</p>
        </div>
        <div data-aos="zoom-in" className="feature-card purple">
          <h3>💬 AI Chat Assistant</h3>
          <p>
            Ask questions about code, get explanations, and solve programming
            problems.
          </p>
        </div>
        <div data-aos="fade-left"  className="feature-card cyan">
          <h3>📊 Analytics Dashboard</h3>
          <p>
            Track your coding patterns and improvement over time with data
            insights.
          </p>
        </div>
      </section>
      <section data-aos="fade-up" className="powerful-features">
        <h2>Powerful Features</h2>
        <div className="powerfull-features-content">
            <ul>
            <li>✅ Multi-language support (JavaScript, Python, Java, C++, and more)</li>
            <li>✅ Contextual AI assistance for debugging</li>
            <li>✅ Export and share analysis reports</li>
            </ul>
            <ul>
            <li>✅ Real-time code analysis with instant feedback</li>
            <li>✅ Code snippet history and management</li>
            <li>✅ Personalized learning recommendations</li>
            </ul>
        </div>
      </section>
    
    </div>
    <Footer/>
    </>
  );
};

export default Landing;
