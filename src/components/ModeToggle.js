import React from 'react';
import { motion } from 'framer-motion';

const ModeToggle = ({ mode, toggleMode }) => {
  return (
    <div style={styles.container}>
      {/* Background slider */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          ...styles.activeHighlight,
          left: mode === 'llm' ? '4px' : '50%',
        }}
      />

      <button
        style={{ ...styles.option, color: mode === 'llm' ? '#fff' : 'var(--text-muted)' }}
        onClick={() => mode !== 'llm' && toggleMode()}
      >
        AI Analysis
      </button>

      <button
        style={{ ...styles.option, color: mode === 'verified' ? '#fff' : 'var(--text-muted)' }}
        onClick={() => mode !== 'verified' && toggleMode()}
      >
        Verified Sources
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    padding: '4px',
    border: '1px solid var(--glass-border)',
    width: '320px',
    marginBottom: '40px',
    gap: '0', // Flex gap handling manually for alignment
  },
  activeHighlight: {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    width: 'calc(50% - 6px)', // Adjust for padding
    background: 'var(--glass-highlight)',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 0,
  },
  option: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    padding: '10px 0',
    fontSize: '0.9rem',
    fontWeight: '600',
    zIndex: 1,
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'color 0.2s ease',
    boxShadow: 'none', // Override global button shadow
  }
};

export default ModeToggle;

