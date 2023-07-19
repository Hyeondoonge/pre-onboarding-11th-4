import { styled } from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px 20px;
  padding-bottom: 0px;
  display: flex;
  justify-content: flex-end;
`;

export const ModeChanger = styled.div`
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
