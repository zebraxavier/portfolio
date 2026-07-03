import { createContext, useEffect, useState, useCallback, memo } from 'react';

const ThemeContext = createContext(null);

/**
 * Reads the persisted/preferred theme SYNCHRONOUSLY — used for FOUC prevention.
 * Priority: localStorage → system preference → 'dark'
 */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

export const ThemeProvider = memo(function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }, [theme]);

  const setTheme    = useCallback((t) => setThemeState(t), []);
  const toggleTheme = useCallback(() => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
});

// Hook is exported from src/hooks/useTheme.js to keep this file component-only
export { ThemeContext };
