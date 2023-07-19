import { ReactNode, createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from 'styles/theme';

interface UserThemeProviderProps {
  children: ReactNode;
}
type Themes = keyof typeof theme;

export const UserThemeContext = createContext<{
  userTheme: Themes;
  setUserTheme: React.Dispatch<React.SetStateAction<Themes>>;
}>({
  userTheme: 'Light',
  setUserTheme: () => {}
});

export default function CustomThemeProvider({ children }: UserThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<Themes>('Dark');

  return (
    <UserThemeContext.Provider value={{ userTheme, setUserTheme }}>
      <ThemeProvider theme={theme[userTheme]}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
}
