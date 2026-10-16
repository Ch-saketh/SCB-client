import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { storage } from '@/utils/storage';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return storage.get<Theme>(STORAGE_KEYS.THEME_MODE, 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(STORAGE_KEYS.THEME_MODE, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
