import { createContext, useContext, useState, useEffect } from 'react';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'portfolio-theme' }) {
    const [theme, setTheme] = useState(defaultTheme);
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage after component mounts
    useEffect(() => {
        try {
            const storedTheme = localStorage.getItem(storageKey);
            if (storedTheme && ['dark', 'light', 'system'].includes(storedTheme)) {
                setTheme(storedTheme);
            }
        } catch (error) {
            console.warn('Failed to load theme from localStorage:', error);
        } finally {
            setMounted(true);
        }
    }, [storageKey]);

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme, mounted]);

    // Theme setter function
    const setValue = (newTheme) => {
        try {
            localStorage.setItem(storageKey, newTheme);
        } catch (error) {
            console.warn('Failed to save theme to localStorage:', error);
        }
        setTheme(newTheme);
    };

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: defaultTheme, setTheme: setValue }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setValue }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use theme context
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}

// Hook for system theme detection
export function useSystemTheme() {
    const [systemTheme, setSystemTheme] = useState('light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
        mediaQuery.addListener(handleChange);

        return () => mediaQuery.removeListener(handleChange);
    }, []);

    return systemTheme;
}