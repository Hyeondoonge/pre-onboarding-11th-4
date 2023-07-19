import { useUserTheme } from 'hooks/useUserTheme';
import { styled } from 'styled-components';
import { MdDarkMode } from 'react-icons/md';
import { BsFillSunFill } from 'react-icons/bs';

export default function ModeChanger() {
  const { userTheme, setUserTheme } = useUserTheme();

  return (
    <StyledWrapper>
      <StyledModeChanger onClick={() => setUserTheme(userTheme === 'Light' ? 'Dark' : 'Light')}>
        <span>{userTheme === 'Light' ? <BsFillSunFill /> : <MdDarkMode />}</span>
      </StyledModeChanger>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledModeChanger = styled.div`
  position: sticky;
  display: flex;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 100%;

  font-size: 30px;

  transition: 0.5s;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.modeBackground};
  }

  svg {
    color: black;
    fill: ${(props) => props.theme.modeColor};
  }
`;
