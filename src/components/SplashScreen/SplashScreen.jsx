import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

/**
 * SplashScreen — shown on first visit only (session-based).
 * Skipped for users who prefer reduced motion.
 */
const SplashScreen = memo(function SplashScreen({ onDone }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('splash-shown');
  });

  useEffect(() => {
    if (!visible) { onDone?.(); return; }
    sessionStorage.setItem('splash-shown', '1');
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 1800);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.splash}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          {/* Wordmark */}
          <motion.div
            className={styles.logo}
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className={styles.mark}>XL</span>
            <span className={styles.sub}>Portfolio</span>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className={styles.barTrack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className={styles.barFill}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: '0%' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default SplashScreen;
