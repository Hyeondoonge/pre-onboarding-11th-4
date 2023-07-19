import { useUserTheme } from 'hooks/useUserTheme';
import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';
import * as Styled from './ModeChanger.styled';

export default function ModeChanger() {
  const { userTheme, setUserTheme } = useUserTheme();

  return (
    <Styled.Wrapper>
      <Styled.ModeChanger onClick={() => setUserTheme(userTheme === 'Light' ? 'Dark' : 'Light')}>
        <span>{userTheme === 'Light' ? <BsFillSunFill /> : <MdDarkMode />}</span>
      </Styled.ModeChanger>
    </Styled.Wrapper>
  );
}
