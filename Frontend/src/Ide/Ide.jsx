import React, { useState ,useEffect} from 'react';
import Editor from "@monaco-editor/react";
import './Ide.css';
import Loader from '../Loader.jsx';
import { API_URL } from '../utils';
import Gemini from '../Gemini.png';

function Ide() {
  const [code, setCode] = useState("// Write your code here");
  const [analyse, setAnalysis] = useState(null);
    const [language, setLanguage] = useState("");
  const [topic, setTopic] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [improvements, setImprovements] = useState("");
  const [edgeCases, setEdgeCases] = useState("");
    const [loading, setLoading] = useState(false);
    const [Error, setError] = useState("");
  useEffect(() => {
    if (analyse) {
      setLanguage(analyse.language || "");
      setTopic(analyse.topic || "");
      setAccuracy(analyse.accuracy || "");
      setTimeComplexity(analyse.time_complexity || "");
      setSpaceComplexity(analyse.space_complexity || "");
      setImprovements(analyse.improvements || "");
      setEdgeCases(analyse.edge_cases || "");
      setError("");
    }
    else{
        setError("")
    }
  }, [analyse]);
  if (loading) {
    return <Loader />; // show loader while fetching
  }
  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/CodeAnalyser`;
        setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: code }),
      });

      const data = await res.json();
      let parsed = data.response;
      setLoading(false);

      // Parse markdown-wrapped JSON if present
      if (typeof parsed === "string" && parsed.includes("```json")) {
        const match = parsed.match(/```json\n([\s\S]*?)\n```/);
        if (match && match[1]) {
          parsed = JSON.parse(match[1]);
        }
      }

      setAnalysis(parsed || null);
    } catch (err) {
      console.error(err);
      setAnalysis({ error: "Error while analyzing code" });
    }
  };

  return (
    <div className="container">
      <div className="CodeEditor">
        <div className="buttons">
          <button>Run</button>
          <button id='Gemini' onClick={handleSubmit}>
            Analyse <img src={Gemini} alt="" height={20} width={30}/>
          </button>
          <button onClick={() => console.log(code)}>Save</button>
        </div>

        <Editor
          height="89vh"
          defaultLanguage="java"
          defaultValue={code}
          theme="vs-dark"
          onChange={(value) => setCode(value)}
        />
      </div>

     <div className="Analyzer">
  <h3>Analyzed Result</h3>
  {Error ? (
    <div className="error">{Error}</div>
  ) : analyse ? (
    <>
      <div className="Box1">
        <div className="box"><strong>Topic:</strong> {topic}</div>
        <div className="box"><strong>Language:</strong> {language}</div>
        <div className="box"><strong>Accuracy:</strong> {accuracy}</div>
      </div>
      <div className="Box2">
        <div className="box"><strong>Time Complexity:</strong> {timeComplexity}</div>
        <div className="box"><strong>Space Complexity:</strong> {spaceComplexity}</div>
      </div>
      <div className="Box3">
        <div className="box"><strong>Improvements:</strong> {improvements}</div>
      </div>
      <div className="Box4">
        <div className="box"><strong>Edge Cases:</strong> {edgeCases}</div> 
      </div>
    </>
  ) : (
    <div className='submit'>Submit code to analyze!</div>
  )}
</div>

    </div>
  );
}

export default Ide;
