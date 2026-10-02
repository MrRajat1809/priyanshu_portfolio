import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);
const STORAGE_KEY = 'portfolio-theme';
const THEMES = ['light', 'dark', 'system'];

function apply(theme) {
  const dark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('system');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (THEMES.includes(stored)) setThemeState(stored);
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  }, []);

  useEffect(() => {
    apply(theme);
    if (theme !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Keep the choice for this visit only.
    }
    setThemeState(next);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
