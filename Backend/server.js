const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

app.post("/api/gemini", async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBnylxuE6kPQQi3OpBgsT4S9Lgp1S2vPsU`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const geminiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      console.log(geminiText)

    res.status(200).json({ response: geminiText });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(503).json({ error: "Gemini service unavailable" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
