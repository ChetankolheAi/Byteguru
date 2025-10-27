import {React,useEffect} from "react";
import { Link } from 'react-router-dom';
import "./Services.css"; // We'll create CSS for styling
import AOS from "aos";
import "aos/dist/aos.css";
const services = [
  { 
    title: "DSA Visualizer", 
    description: "Visualize sorting, searching, and graph algorithms.", 
    path: "/dsa-visualizer" 
  },
  { 
    title: "AI Generated Coding Test", 
    description: "Generate tests through AI to check your coding skills and evaluate your performance with AI.", 
    path: "/QuizGenerator" 
  },
  { 
    title: "Chatbot", 
    description: "Interact with our AI chatbot in real-time.", 
    path: "/Chatbot" 
  },
  { 
    title: "Code Analyzer", 
    description: "Analyze your code for errors and efficiency.", 
    path: "/code-analyzer" 
  },
  { 
    title: "Chatbot History", 
    description: "View your past chatbot conversations.", 
    path: "/History" 
  },
  { 
    title: "Security", 
    description: "Check and improve the security of your applications.", 
    path: "/security" 
  },
];


function Services() {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true }); // animation lasts 1s
      }, []);
  return (
    <div className="services-container">
      <h1 className="services-heading" data-aos="zoom-in">Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
        <div key={index} className="service-card" data-aos="zoom-out">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
                <Link to={service.path}>
                <button>
                    Explore <i className="fa-solid fa-arrow-right"></i>
                </button>
                </Link>          
        </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
