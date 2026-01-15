import React from 'react';
import { motion } from 'framer-motion';

// Simple helper to bold text surrounded by **
const formatText = (text) => {
  // Split by double asterisks
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} style={{ color: 'var(--accent-primary)' }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-card"
      style={styles.card}
    >
      <div style={styles.header}>
        <div style={styles.iconCircle}>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={styles.pulse}
          />
        </div>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)' }}>ANALYSIS RESULT</h3>
      </div>

      <div style={styles.content}>
        {result.split('\n').map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            style={styles.text}
          >
            {formatText(line)}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    padding: '30px',
    width: '100%',
    maxWidth: '700px',
    marginTop: '40px',
    borderLeft: '4px solid var(--accent-primary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    borderBottom: '1px solid var(--glass-border)',
    paddingBottom: '15px',
  },
  iconCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--accent-primary)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1px solid var(--accent-primary)',
    opacity: 0.5,
    position: 'absolute',
  },
  content: {
    lineHeight: '1.7',
    color: 'var(--text-primary)',
    fontSize: '1.05rem',
  },
  text: {
    marginBottom: '12px',
  }
};

export default ResultCard;

