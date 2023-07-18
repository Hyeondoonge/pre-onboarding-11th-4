import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import ResultErrorFallback from './ResultErrorFallback';
import { useEffect, useState } from 'react';

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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const data = {
    result: []
  }; // 목데이터
  const MAX_LENGTH = 10;
  const RESULT_LENGTH = Math.min(MAX_LENGTH, data.result.length);

  useEffect(() => {
    const handleKeyup = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex(selectedIndex - 1 <= -1 ? RESULT_LENGTH - 1 : selectedIndex - 1);
      } else if (event.key === 'ArrowDown') {
        setSelectedIndex(selectedIndex + 1 === RESULT_LENGTH ? 0 : selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeyup);
    };
  }, [selectedIndex, setSelectedIndex, RESULT_LENGTH]);

  return (
    <StyledList>
      {data.result.length === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
      {data.result
        .filter((_, index) => index < RESULT_LENGTH)
        .map(({ sickNm }, index) => (
          <StyledSickItem
            key={index}
            isSelected={selectedIndex === index}
            onMouseOver={() => {
              setSelectedIndex(index);
            }}
          >
            {sickNm}
          </StyledSickItem>
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

const StyledSickItem = styled(StyledItem)<{ isSelected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? props.theme.focused : 'none')};
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
