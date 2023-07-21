import { ChakraProvider, Theme, useColorMode } from '@chakra-ui/react';
import { clientConfig } from 'config';
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { chakraTheme } from 'styles/themes';
const COLOR_MODE_KEY = 'chakra-ui-color-mode';

export enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeProvider {
  theme: Theme;
  name: string;
  setTheme: (themeName: string) => void;
  mode: 'light' | 'dark';
}

export const ThemeContext = createContext({
  theme: null,
  name: null,
  setTheme: null,
  mode: null,
});

export const useChakraThemeContext = () => useContext<ThemeProvider>(ThemeContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const defaultTheme = clientConfig.defaultTheme;
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const setTheme = useCallback(
    (themeName: string) => {
      if (chakraTheme[themeName]) {
        setCurrentTheme(themeName);
        localStorage.setItem('theme', themeName);
        localStorage.setItem(COLOR_MODE_KEY, chakraTheme[themeName]?.config?.initialColorMode);
      }
    },
    [setCurrentTheme],
  );

  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    if (preferredTheme && chakraTheme[preferredTheme]) {
      setTheme(preferredTheme);
    } else {
      const defaultTheme = clientConfig.defaultTheme;
      setTheme(defaultTheme);
    }
  }, [setTheme]);

  const theme = chakraTheme[currentTheme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        name: currentTheme,
        setTheme,
        mode: theme?.config?.initialColorMode,
      }}
    >
      <ChakraProvider theme={theme} resetCSS>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};
