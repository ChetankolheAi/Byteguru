import React, { useState , useEffect } from "react";
import AILoader from "../Loaders/AILoader";
import TestResult from '../Loaders/TestResult'

import "./Quizegenerator.css";
import { API_URL ,notify} from "../utils";
import Editor from "@monaco-editor/react";

function QuizGenerator({userid}) {
  const [level, setLevel] = useState("beginner");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Generating, setGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // stores code per question
  const [analyses, setAnalyses] = useState([]); // stores API analysis results
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const [isSubmited , setIsSubmited] = useState(false)
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (screenWidth <= 900) {
    return (
      <div className="restricted-container">
        <h2>⚠️ Screen Too Small</h2>
        <p>
          Please use a device with a larger screen (width above 900px) to take this coding test.
        </p>
        <p>💻 Try switching to a laptop or desktop for the best experience!</p>
      </div>
    );
  }

  // Generate 5 questions
  const handleGenerate = async () => {
  setIsSubmited(false)
    setCurrentIndex(0);
    setAnswers([]);
    setAnalyses([]);
    setScore(0);
    setTestSubmitted(false);
    setGenerating(true);
    setTimeout( async ()  => {
    try {
      const url = `${API_URL}/api/questions/${level}`;
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      
        setGenerating(false);
      
    }
    }, 1000);
  };

  //Update current question code
  const handleCodeChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
  };

 

  // Submit the entire test
const handleFinalSubmit = async () => {
  let finalScore = 0;
  setLoading(true);

  try {
   
    const prompt = `
    You are a code evaluator.
    Here are ${answers.length} coding questions and their answers.
    Return ONLY valid JSON like:
    {"correctCount": X, "total": ${answers.length}}

    ${questions.map(
      (q, i) =>
        `Q${i + 1}: ${q}\nCode:\n${answers[i] || "No answer"}\n`
    ).join("\n")}
        `;


    const res = await fetch(`${API_URL}/api/TestScoreCalculator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    console.log(res)
   
    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("Too many requests. Please wait and try again.");
      }
      if (res.status === 503) {
        throw new Error("AI service unavailable.");
      }
      throw new Error("Failed to evaluate test.");
    }

    const data = await res.json();

    // if (!data.success || !data.response) {
    //   throw new Error("Invalid response from evaluator.");
    // }



    let parsed;
    try {
      parsed = data.response;

      if (typeof parsed === "string") {
        const match = parsed.match(/```json\s*([\s\S]*?)\s*```/);
        if (match) parsed = JSON.parse(match[1]);
        else parsed = JSON.parse(parsed); // fallback
      }
    } catch {
      throw new Error("Failed to parse evaluation result.");
    }

    finalScore =
      typeof parsed.correctCount === "number"
        ? parsed.correctCount
        : 0;

    
    setScore(finalScore);
    setTestSubmitted(true);
    setIsSubmited(true);

   

    const saveRes = await fetch(`${API_URL}/api/addTestScore`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid, result: finalScore }),
    });

    if (!saveRes.ok) {
      throw new Error("Score calculated but failed to save.");
    }

  } catch (err) {
    console.error("Final submit error:", err.message);
    notify(err.message || "Something went wrong!", "error");
  } finally {
    setTimeout(() => setLoading(false), 800);
  }
};


  // const currentQuestion = questions[currentIndex];
  const currentCode = answers[currentIndex] || "// Write your code here";
  
  return (
    <div className="head-container">
      <h2>🧠 Coding Test Generator</h2>

      <div className="Level-Selector">
        <label>Select Level: </label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="pro">Pro</option>
        </select>

        <div className="gen-btn1">
          <button onClick={handleGenerate} className="buttonGenerate1">
            {Generating ? "Generating..." : "Generate Test _"}{" "}
            {!Generating && (
              <img
                src="https://res.cloudinary.com/dmuecdqxy/q_auto/v1737001422/static/magiciconwhitegradientsvg_1737001421_51952.svg"
                alt=""
                height={20}
                width={20}
              />
            )}
          </button>
          {(currentIndex === questions.length - 1)&&!isSubmited?(
            <button onClick={handleFinalSubmit} className="final-submit-button" >
              🚀 Submit Full Test
            </button>
          ):""}
        </div>
      </div>

      {Generating? <AILoader/>:""}
      {loading ? 
       (
        <TestResult />
      ) : testSubmitted ? (
        <div className="summary-container">
  <h3>✅ Test Submitted Successfully!</h3>
  <p>
    Your Score: <strong>{score}</strong> / {questions.length}
  </p>

  {/* 🎉 Dynamic feedback message */}
  {score === questions.length ? (
    <p className="praise">🌟 Outstanding! You nailed every single question!</p>
  ) : score >= questions.length * 0.7 ? (
    <p className="praise">🔥 Great job! You’re almost perfect, keep it up!</p>
  ) : score >= questions.length * 0.4 ? (
    <p className="praise">💪 Good effort! Review a few concepts and you’ll ace it next time!</p>
  ) : (
    <p className="praise">🚀 Don’t give up! Keep practicing and you’ll improve fast!</p>
  )}

  <button onClick={handleGenerate}>Start New Test</button>
</div>

      ) : questions.length > 0 ? (
        <>
    <div className="testContainer">
      <div className="question-box">
        <h3>Test Questions</h3>
  {questions.slice(0, currentIndex + 1).map((q, i) => (
    <p
      key={i}
      className={i === currentIndex ? "current-question" : ""}
    >
      <span>Q{i + 1}.</span> {q}
    </p>
  ))}
  <div className="button-group">
            <button
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
            >
              ⬅ Previous
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={currentIndex === questions.length - 1}
            >
              Next ➡
            </button>
          </div>
          
</div>



          <div className="editorbox">
            <Editor
              height="60vh"
              width="100%"
              defaultLanguage="java"
              value={currentCode}
              theme="vs-dark"
              onChange={handleCodeChange}
            />
          </div>
        </div>
          

          {analyses[currentIndex] && (
            <pre className="analysis-box">
              {JSON.stringify(analyses[currentIndex], null, 2)}
            </pre>
          )}

          
        </>
      ) : (
        <p>Click “Generate Test” to begin.</p>
      )}
    </div>
  );
}

export default QuizGenerator;
