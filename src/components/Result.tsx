import { styled } from 'styled-components';

export default function Result() {
  const data = { result: [] }; // 목데이터

  return (
    <StyledResult>
      <StyledSickList>
        {data.result.map(({ sickNm }, index) => (
          <StyledSickItem key={index}>{sickNm}</StyledSickItem>
        ))}
      </StyledSickList>
    </StyledResult>
  );
}

const StyledResult = styled.div`
  background-color: ${(props) => props.theme.textBackground};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  color: ${(props) => props.theme.main};
  border: ${(props) => props.theme.textBorder};
  border-top: none;
`;

const StyledSickList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const StyledSickItem = styled.li`
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.focused};
  }
`;
