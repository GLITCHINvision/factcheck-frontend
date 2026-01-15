import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import FactInput from "./components/FactInput";
import ResultCard from "./components/ResultCard";
import ModeToggle from "./components/ModeToggle";
import { motion } from "framer-motion";
import "./App.css";

// Loading phases for "Smart" feel
const LOADING_PHASES = [
  "Scanning global databases...",
  "Cross-referencing verified sources...",
  "Analyzing semantic context...",
  "Synthesizing truth..."
];

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("llm");

  // New Options State
  const [detailLevel, setDetailLevel] = useState("concise");
  const [showSources, setShowSources] = useState(false);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Smart loading text effect
  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingPhase(0);
      interval = setInterval(() => {
        setLoadingPhase((prev) => (prev + 1) % LOADING_PHASES.length);
      }, 1500); // Change text every 1.5s
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleFactCheck = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult("");

    try {
      const res = await axios.post("http://localhost:5000/fact-check", {
        query,
        mode,
        detail_level: detailLevel,
        show_sources: showSources,
      });

      setResult(res.data.answer);
    } catch (error) {
      console.error(error);
      setResult("**SYSTEM ERROR**: Connectivity to truth matrix lost. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  const toggleMode = () => {
    setMode((prev) => (prev === "llm" ? "verified" : "llm"));
  };

  return (
    <div className="app-container">
      <div className="background-gradient"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero-section"
      >
        <h1 className="glitch-title" data-text="FACT CHECKER">FACT CHECKER</h1>
        <p className="subtitle">Verifying reality // Engine v2.0</p>
      </motion.div>

      <ModeToggle mode={mode} toggleMode={toggleMode} />

      <FactInput
        query={query}
        setQuery={setQuery}
        handleFactCheck={handleFactCheck}
        startListening={startListening}
        listening={listening}
        isTyping={isLoading} // reusing prop name for loading state
        handleMicSubmit={handleMicSubmit}
        transcript={transcript}
      />

      {/* Options Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="options-panel"
      >
        <div className="option-group">
          <label>Detail Level:</label>
          <div className="toggle-pill">
            <button
              className={detailLevel === "concise" ? "active" : ""}
              onClick={() => setDetailLevel("concise")}
            >
              Concise
            </button>
            <button
              className={detailLevel === "detailed" ? "active" : ""}
              onClick={() => setDetailLevel("detailed")}
            >
              Deep Dive
            </button>
          </div>
        </div>

        <div className="option-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={showSources}
              onChange={(e) => setShowSources(e.target.checked)}
            />
            <span className="checkmark"></span>
            Show Sources
          </label>
        </div>
      </motion.div>

      {isLoading && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={loadingPhase} // Re-animate on text change
          style={{
            marginTop: '20px',
            color: 'var(--accent-tertiary)',
            fontFamily: 'var(--font-display)',
            letterSpacing: '1px'
          }}
        >
          {LOADING_PHASES[loadingPhase]}
        </motion.p>
      )}

      <ResultCard result={result} />
    </div>
  );
}

export default App;

