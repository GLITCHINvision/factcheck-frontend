import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FactInput = ({ query, setQuery, handleFactCheck, startListening, listening, isTyping, handleMicSubmit, transcript }) => {
  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.inputWrapper}
      >
        <input
          type="text"
          style={styles.input}
          placeholder="Ask anything... or spit facts."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isTyping}
          onKeyDown={(e) => e.key === 'Enter' && handleFactCheck()}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={startListening}
          disabled={listening}
          style={{ ...styles.micBtn, ...(listening ? styles.listening : {}) }}
        >
          <FaMicrophone color={listening ? '#000' : '#fff'} />
        </motion.button>
      </motion.div>

      {listening && <p style={styles.listeningText}>Listening...</p>}

      {transcript && !listening && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.transcriptBox}>
          "{transcript}"
          <button onClick={handleMicSubmit} style={styles.useBtn}>Use This</button>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px var(--accent-primary)' }}
        whileTap={{ scale: 0.95 }}
        onClick={handleFactCheck}
        disabled={isTyping || !query}
        style={styles.checkBtn}
      >
        {isTyping ? "Vibe Checking..." : "Fact Check"}
      </motion.button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '2rem 0',
  },
  inputWrapper: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    background: 'var(--glass-bg)',
    border: '1px solid var(--glass-border)',
    borderRadius: '16px',
    padding: '6px',
    backdropFilter: 'blur(var(--blur-amt))',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    padding: '16px',
    fontSize: '1.1rem',
    outline: 'none',
    fontFamily: 'var(--font-main)',
  },
  micBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0 20px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
  listening: {
    background: 'rgba(77, 121, 255, 0.2)',
    boxShadow: '0 0 15px var(--accent-primary)',
  },
  listeningText: {
    color: 'var(--accent-primary)',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
    letterSpacing: '1px',
    fontWeight: 'bold',
  },
  transcriptBox: {
    marginTop: '15px',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255,255,255,0.03)',
    padding: '8px 16px',
    borderRadius: '8px',
  },
  useBtn: {
    background: 'var(--glass-border)',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  checkBtn: {
    marginTop: '24px',
    background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
    color: '#fff',
    border: 'none',
    padding: '14px 40px',
    fontSize: '1.1rem',
    fontWeight: '700',
    borderRadius: '50px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'var(--font-display)',
    width: '100%',
    boxShadow: '0 4px 15px rgba(77, 121, 255, 0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
};

export default FactInput;
