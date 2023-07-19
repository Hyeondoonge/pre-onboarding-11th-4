import { UserThemeContext } from 'contexts/UserThemeProvider';
import { useContext } from 'react';

export function useUserTheme() {
  const context = useContext(UserThemeContext);

  if (!context) {
    throw new Error(
      'CustomThemeProvider가 트리에 존재하지 않습니다! CustomTheme Context 접근을 위해 CustomThemeProvider를 사용하려는 컴포넌트 외부에 선언해주세요.'
    );
  }

  return context;
}
