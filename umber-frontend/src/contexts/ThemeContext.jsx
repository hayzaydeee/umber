import React, { createContext, useContext, useEffect, useState } from 'react';

// ===== SIMPLE THEME CONTEXT =====
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for explicit preference
    const saved = localStorage.getItem('umber-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    // Return 'system' if no explicit preference
    return 'system';
  });

  // Apply theme to document using modern Tailwind v4 approach
  useEffect(() => {
    let actuallyDark;
    
    if (theme === 'system') {
      actuallyDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      actuallyDark = theme === 'dark';
    }
    
    // Modern Tailwind v4: toggle 'dark' class on document element
    // This works with @custom-variant dark (&:where(.dark, .dark *))
    if (actuallyDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference (don't save 'system', remove the key instead)
    if (theme === 'system') {
      localStorage.removeItem('umber-theme');
    } else {
      localStorage.setItem('umber-theme', theme);
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', actuallyDark ? '#1A1A16' : '#F7F6F4');
    }
  }, [theme]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Trigger re-render by updating a dependency
      setTheme('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Computed isDark value for components
  const isDark = theme === 'system' 
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : theme === 'dark';

  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

  // Advanced theme setting (light/dark/system)
  const setThemeMode = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Get theme-aware background gradients for onboarding stages
  const getStageBackground = (stage) => {
    // Use Tailwind's built-in dark: variants instead of custom classes
    const backgrounds = {
      void: 'bg-gradient-to-br from-umber-50 via-white to-umber-50 dark:from-umber-900 dark:via-umber-800 dark:to-umber-900',
      foundation: 'bg-gradient-to-br from-moss-50 via-white to-ochre-50 dark:from-umber-900 dark:via-moss-900 dark:to-ochre-900',
      creation: 'bg-gradient-to-br from-moss-50 via-white to-ochre-50 dark:from-umber-900 dark:via-moss-900 dark:to-ochre-900',
      awakening: 'bg-gradient-to-br from-moss-50 via-white to-ochre-50 dark:from-umber-900 dark:via-moss-900 dark:to-ochre-900',
      emergence: 'bg-gradient-to-br from-moss-50 via-white to-ochre-50 dark:from-umber-900 dark:via-moss-900 dark:to-ochre-900',
      complete: 'bg-gradient-to-br from-moss-50 via-white to-ochre-50 dark:from-umber-900 dark:via-moss-900 dark:to-ochre-900'
    };
    return backgrounds[stage] || backgrounds.void;
  };

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      theme, 
      toggleTheme, 
      setThemeMode, 
      getStageBackground 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Modern theme toggle component aligned with Tailwind v4
export const ThemeToggle = ({ className = '' }) => {
  const { isDark, theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-200 bg-white/10 hover:bg-white/20 dark:bg-umber-800/50 dark:hover:bg-umber-700/50 backdrop-blur-sm border border-transparent hover:border-white/20 dark:hover:border-umber-600/50 ${className}`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode${theme === 'system' ? ' (currently using system)' : ''}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-umber-600 dark:text-umber-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
};
