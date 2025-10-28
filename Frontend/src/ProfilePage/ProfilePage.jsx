import React ,{useState , useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ProfilePage.css";
import { API_URL } from './../utils';
import Footer from '../Footer/Footer'

// const testScores = [
//   { test: "Test 1", correct: 3 },
//   { test: "Test 2", correct: 4 },
//   { test: "Test 3", correct: 5 },
//   { test: "Test 4", correct: 2 },
//   { test: "Test 5", correct: 4 },
// ];

const ProfilePage = ({ userid , email , firstname ,isAuthenticated }) => {
    
  const [scores, setScores] = useState([]);



const fetchScores = async () => {
    try {
      const response = await fetch(`${API_URL}/api/getTestScores/${userid}`);
      const data = await response.json();

      if (data.success) {
        setScores(data.scores.map((item, index) => ({
          test: item.testName || `Test ${index + 1}`,
          correct: item.correct        })));
      }
    } catch (error) {
      console.error("Error fetching test scores:", error);
    }
  };
  useEffect(() => {
  fetchScores();
}, [userid]);




  useEffect(() => {

    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);


  const user = {
    name: "Chetan Kolhe",
    email: "chetan@example.com",
    about:
      "I am 'YourName', a passionate MERN stack developer and learner focused on AI-driven web apps.('you can change this')",
  };

  return (
    <>
    <div className="profile-wrapper">
         {isAuthenticated ? (
      <div className="profile-container">

        <div className="profile-left">
          <div className="avatar">
            <div className="avatar-circle">
              <i className="fa-solid fa-user"></i>
            </div>
            <p className="upload-text">Upload Picture</p>
          </div>

          <div className="social-links">
            <button><i className="fa-brands fa-facebook"></i> Add Facebook</button>
            <button><i className="fa-brands fa-twitter"></i> Add Twitter</button>
            <button><i className="fa-brands fa-instagram"></i> Add Instagram</button>
            <button><i className="fa-brands fa-google-plus-g"></i> Add Google+</button>
            <button><i class="fa-solid fa-code-pull-request"></i> Add Github</button>
            <button><i class="fa-solid fa-code"></i> Add Leetcode</button>
          </div>
        </div>


        <div className="profile-right">
          <h2>Profile</h2>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={firstname}  />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email}  />
          </div>
          <div className="form-group">
            <label>About Me:</label>
            <textarea rows="3" value={user.about}  />
          </div>

          <button className="update-btn">Update Information</button>

          <div className="chart-section">
            <h3>Test Performance (out of 5 questions)</h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scores} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="test" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="correct"
                stroke="var(--theme-color)"
                strokeWidth={3}
                activeDot={{ r: 6 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>

                    </div>
        </div>
      </div>
      ) : (
        <p className="not-logged-in">Please log in to view your profile.</p>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ProfilePage;
