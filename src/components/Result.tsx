import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import ResultErrorFallback from './ResultErrorFallback';

export default function Result() {
  return (
    <StyledResult>
      <StyledBorder>
        <div />
      </StyledBorder>
      <ErrorBoundary fallback={<ResultErrorFallback />}>
        <List />
      </ErrorBoundary>
    </StyledResult>
  );
}

function List() {
  const data = {
    result: []
  }; // 목데이터
  const MAX_LENGTH = 10;
  const RESULT_LENGTH = Math.min(MAX_LENGTH, data.result.length);

  return (
    <StyledList>
      {data.result.length === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
      {data.result
        .filter((_, index) => index < RESULT_LENGTH)
        .map(({ sickNm }, index) => (
          <StyledSickItem key={index}>{sickNm}</StyledSickItem>
        ))}
    </StyledList>
  );
}

const StyledResult = styled.div`
  position: relative;
  width: 100%;

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

const StyledBorder = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 95%;
    height: 1px;
    background-color: ${(props) => props.theme.border};
    position: absolute;
    top: 0;
  }
`;
