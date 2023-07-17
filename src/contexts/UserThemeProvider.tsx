import { ReactNode, createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from 'styles/theme';

interface UserThemeProviderProps {
  children: ReactNode;
}
type Themes = keyof typeof theme;

export const UserThemeContext = createContext<React.Dispatch<React.SetStateAction<Themes>>>(
  () => {}
);

export default function CustomThemeProvider({ children }: UserThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<Themes>('Light');

  return (
    <UserThemeContext.Provider value={setUserTheme}>
      <ThemeProvider theme={theme[userTheme]}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
}
