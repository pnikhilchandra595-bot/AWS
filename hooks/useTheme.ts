import { useState, useEffect } from 'react';

export type Theme = 'dark' | 'light' | 'cyberpunk' | 'naruto';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('devflow_theme');
    return (saved as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('devflow_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'cyberpunk';
      if (prev === 'cyberpunk') return 'naruto';
      return 'dark';
    });
  };

  return { theme, setTheme, toggleTheme };
};
