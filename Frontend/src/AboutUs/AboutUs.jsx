import React from 'react';
import './Aboutus.css';

function AboutUs() {
  return (
    <div className="Aboutus">
      <div className="about">

  
        <div className="Heading">
          <h1>About Us</h1>
        </div>

      
        <div className="descp">
          <p>
            Welcome to <strong>XRayAi</strong>, your intelligent AI-powered chatbot designed to make
            conversations smarter, faster, and more helpful than ever.
          </p>
          <p>
            Built with the <strong>MERN Stack</strong> (MongoDB, Express.js, React.js, and Node.js), 
            XRayAi combines the power of modern web technologies with advanced AI to deliver an interactive 
            and personalized chat experience. Whether you need quick answers, detailed explanations, 
            or just a friendly conversation, XRayAi is here to assist — anytime, anywhere.
          </p>
        </div>

      
        <div className="section">
          <h2>Our Vision</h2>
          <p>
            To create an AI assistant that feels natural, understands context, and adapts to your needs — 
            helping you work smarter, learn faster, and achieve more.
          </p>
        </div>

        <div className="section">
          <h2>Our Mission</h2>
          <ul>
            <li>Make AI conversations human-like and engaging</li>
            <li>Provide instant, accurate, and relevant responses</li>
            <li>Continuously learn and improve through user interactions</li>
            <li>Deliver a seamless experience across devices</li>
          </ul>
        </div>

      
        <div className="section">
          <h2>Technologies We Use</h2>
          <ul>
            <li><strong>Frontend:</strong> React.js</li>
            <li><strong>Backend:</strong> Node.js + Express.js</li>
            <li><strong>Database:</strong> MongoDB</li>
            <li><strong>Authentication:</strong> JWT</li>
            <li><strong>AI Engine:</strong> Natural Language Processing</li>
          </ul>
        </div>

      
        <div className="section license">
          <h2>License</h2>
          <p>
            <strong>© 2025 XRayAi    </strong>
              _You are free to use, modify, and distribute with proper attribution.
          </p>
        </div>

   
        <div className="section funfact">
          <h2>Fun Fact</h2>
          <p>
            XRayAi isn’t just about answering questions — it’s about understanding <em>you</em>. 
            Our goal is to make technology feel more human and less robotic.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
