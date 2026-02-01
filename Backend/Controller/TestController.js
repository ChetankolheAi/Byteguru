import {TestScore_Details} from '../Model/model.js'; 
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API__KEY;
//Test Generator
const questions = {
  beginner: [
    "Write a program to find the largest of two numbers.",
    "Check if a number is even or odd.",
    "Print Fibonacci series up to N terms.",
    "Find factorial of a number.",
    "Reverse a string.",
    "Check if a number is prime.",
    "Count vowels in a string."
  ],
  intermediate: [
    "Implement binary search on a sorted array.",
    "Find GCD of two numbers.",
    "Implement a stack using an array.",
    "Sort an array using bubble sort.",
    "Find second largest element in an array.",
    "Simple calculator using switch case.",
    "Check if string is palindrome."
  ],
  pro: [
    "Implement quicksort algorithm.",
    "Design a class for Bank transactions.",
    "Implement a linked list with insert and delete.",
    "Implement a graph using adjacency list.",
    "Find shortest path using Dijkstra’s algorithm.",
    "Implement multithreading simulation in JS.",
    "Build your own promise in JavaScript."
  ]
};

 const TestGenerator = async(req,res)=>{
     const { level } = req.params;
  const levelQuestions = questions[level];

  if (!levelQuestions) {
    return res.status(400).json({ error: "Invalid level" });
  }

  
  const randomQs = levelQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
  res.json({ level, questions: randomQs });
}





const TestScoreCalculator = async (req, res) => {
  const { prompt } = req.body;
  console.log("Code received:", prompt);

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: 
                    `${prompt}`
              },
            ],
          },
        ],
      }
    );

    let geminiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    // Trim whitespace
    geminiText = geminiText.trim();

    let analysis;
    try {
      // Remove markdown ```json ``` block if present
      const match = geminiText.match(/```json\s*([\s\S]*?)\s*```/i);
      if (match && match[1]) {
        analysis = JSON.parse(match[1]);
      } else {
        analysis = JSON.parse(geminiText);
      }
    } catch (err) {
      console.error("JSON parse error:", err.message);
      analysis = { error: "Failed to parse Gemini response", raw: geminiText };
    }

    res.status(200).json({ response: analysis });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(503).json({ error: "Gemini service unavailable" });
  }
};



const RetriveTestScore = async (req , res) =>{
console.log("Received Params:", req.params); // ✅ shows userid

  try {
    const { userid } = req.params;
    const userScores = await TestScore_Details.findOne({ userid });

    if (!userScores) {
      return res.json({ success: true, scores: [] });
    }

    const chartData = userScores.scores.map((score, i) => ({
      test: `Test ${i + 1}`,
      correct: score
    }));

    res.json({ success: true, scores: chartData });
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const SaveTestScore = async (req , res) =>{
  console.log("Received body:", req.body);
const { userid, result } = req.body;
if (!userid || typeof result !== "number") {
  return res.status(400).json({ success: false, message: "Invalid input" });
}

  try {
    const { userid, result } = req.body; // result = 0-5
    if (!userid || typeof result !== "number") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    let user = await TestScore_Details.findOne({ userid });

    if (!user) {
      user = new TestScore_Details({ userid, scores: [result] });
    } else {
      user.scores.push(result); // append to scores array
    }

    await user.save();
    res.json({ success: true, message: "Score saved successfully" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export{TestGenerator , SaveTestScore , RetriveTestScore,TestScoreCalculator}