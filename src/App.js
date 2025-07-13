import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaMicrophone, FaSun, FaMoon } from "react-icons/fa";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mode, setMode] = useState("llm"); 

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const handleFactCheck = async () => {
    if (!query.trim()) return;
    setIsTyping(true);
    setResult("");
    try {
      const res = await axios.post("http://localhost:5000/fact-check", {
        query,
        mode, 
      });
      animateText(res.data.answer);
    } catch (error) {
      setResult("⚠️ Error fetching data. Please try again.");
      setIsTyping(false);
    }
  };

  const animateText = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      setResult((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
  };

  const startListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleMicSubmit = () => {
    if (transcript) {
      setQuery(transcript);
      SpeechRecognition.stopListening();
    }
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const toggleMode = () => {
    setMode((prev) => (prev === "llm" ? "verified" : "llm"));
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </div>

      <h1>Fact-Checking RAG Chatbot</h1>

      {/* Toggle for Verified Mode */}
      <div className="toggle-row">
        <label style={{ fontSize: "14px", color: "#ccc" }}>
          <input
            type="checkbox"
            checked={mode === "verified"}
            onChange={toggleMode}
          />{" "}
          Verified Only
        </label>
      </div>

      <input
        type="text"
        className="query-box"
        placeholder="Type your question or click Mic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isTyping}
      />

      <div className="btn-row">
        <button onClick={handleFactCheck} disabled={isTyping || !query}>
          {isTyping ? "Checking..." : "Fact Check"}
        </button>

        <button onClick={startListening} disabled={listening}>
          <FaMicrophone /> {listening ? "Listening..." : "Start Mic"}
        </button>

        <button onClick={handleMicSubmit} disabled={!transcript}>
          Use Voice Input
        </button>
      </div>

      {/* Mode Indicator */}
      <p style={{ fontSize: "12px", color: "#999" }}>
        Mode: {mode === "verified" ? " Verified Only" : " LLM"}
      </p>

      {result && (
        <div className="result-box">
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}

export default App;
