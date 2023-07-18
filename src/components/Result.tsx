import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import ResultErrorFallback from './ResultErrorFallback';
import { useEffect, useState } from 'react';

interface ResultProps {
  keyword: string;
}
interface ListProps {
  keyword: string;
}

export default function Result({ keyword }: ResultProps) {
  return (
    <StyledResult>
      <StyledBorder>
        <div />
      </StyledBorder>
      <ErrorBoundary fallback={<ResultErrorFallback />}>
        <List keyword={keyword} />
      </ErrorBoundary>
    </StyledResult>
  );
}

function List({ keyword }: ListProps) {
  // TODO: keyword로 하이라이팅
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

  const handleMouseOver = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <StyledList>
      {keyword === '' && <StyledItem>최근검색어가 없습니다.</StyledItem>}
      {keyword !== '' && RESULT_LENGTH === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
      {data.result
        .filter((_, index) => index < RESULT_LENGTH)
        .map(({ sickNm }, index) => (
          <SickItem
            key={index}
            keyword={keyword}
            isSelected={selectedIndex === index}
            handleMouseOver={() => handleMouseOver(index)}
            name={sickNm}
          />
        ))}
    </StyledList>
  );
}

interface SickItemProps {
  keyword: string;
  isSelected: boolean;
  handleMouseOver: () => void;
  name: string;
}

function SickItem({ keyword, isSelected, handleMouseOver, name }: SickItemProps) {
  const splited = name.split(keyword);

  return (
    <StyledSickItem isSelected={isSelected} onMouseOver={handleMouseOver}>
      {splited.map((value, index) => (
        <span>
          {value}
          {index !== splited.length - 1 && <span className='highlight'>{keyword}</span>}
        </span>
      ))}
    </StyledSickItem>
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

  .highlight {
    font-weight: 700;
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
