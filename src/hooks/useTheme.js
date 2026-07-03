import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/** useTheme — access the current theme and toggle function */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
