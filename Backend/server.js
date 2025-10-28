import express from "express";
import cors from "cors";
import axios from "axios";
import taskRoutes  from './Routes/index.js';
import './Model/db.js'; 
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_APIKEY;



app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;
  console.log(req.body);

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt}],
          },
        ],
      }
    );

    const geminiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      console.log("Gemini response saved to DB:", geminiText);

    res.status(200).json({ response: geminiText });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(503).json({ error: "Gemini service unavailable" });
  }
});





app.use('/api', taskRoutes);






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

app.get("/api/questions/:level", (req, res) => {
  const { level } = req.params;
  const levelQuestions = questions[level];

  if (!levelQuestions) {
    return res.status(400).json({ error: "Invalid level" });
  }

  
  const randomQs = levelQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);
  res.json({ level, questions: randomQs });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
