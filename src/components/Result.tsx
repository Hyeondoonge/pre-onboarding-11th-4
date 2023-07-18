import { styled } from 'styled-components';

export default function Result() {
  const data = {
    result: []
  }; // 목데이터

  return (
    <StyledResult>
      <StyledList>
        {data.result.length === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
        {data.result.map(({ sickNm }, index) => (
          <StyledSickItem key={index}>{sickNm}</StyledSickItem>
        ))}
      </StyledList>
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

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.li`
  padding: 15px;
`;

const StyledSickItem = styled(StyledItem)`
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.focused};
  }
`;
