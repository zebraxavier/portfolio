import { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import { useTheme } from '../../hooks/useTheme';
import { useAnalytics } from '../../hooks/useAnalytics';
import styles from './ThemeToggle.module.css';

const ThemeToggle = memo(function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { trackThemeChange } = useAnalytics();
  const isDark = theme === 'dark';

  const handleToggle = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    toggleTheme();
    trackThemeChange(next);
    // Sync meta theme-color
    const tc = document.getElementById('meta-theme-color');
    if (tc) tc.content = next === 'light' ? '#f8f9fb' : '#050505';
  }, [isDark, toggleTheme, trackThemeChange]);

  return (
    <motion.button
      className={styles.toggle}
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!isDark}
      title={isDark ? 'Light mode' : 'Dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className={styles.icon}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        >
          {isDark ? <RiSunLine size={16} /> : <RiMoonLine size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
});

export default ThemeToggle;
