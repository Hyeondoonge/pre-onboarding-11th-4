/* eslint-disable */
import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import ResultErrorFallback from './ResultErrorFallback';
import { useEffect, useState } from 'react';
import { TResultResponse } from 'types/common';
import { cacheRepository } from 'Repository/CacheRepository';

interface ResultProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}
interface ListProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function Result({ keyword, setKeyword }: ResultProps) {
  return (
    <StyledResult
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <StyledBorder>
        <div />
      </StyledBorder>
      <ErrorBoundary fallback={<ResultErrorFallback />}>
        <List keyword={keyword} setKeyword={setKeyword} />
      </ErrorBoundary>
    </StyledResult>
  );
}

function List({ keyword, setKeyword }: ListProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchResult, setSearchResult] = useState<TResultResponse>({ data: [], error: undefined });
  const { data, error } = searchResult;

  const MAX_LENGTH = 10;
  const RESULT_LENGTH = Math.min(MAX_LENGTH, data.length);

  const updateFocusedItem = (index: number) => {
    if (!data[index]) return;
    setSelectedIndex(index);
    // TODO: data[index] undefined 오류
    (document.querySelector('input') as HTMLInputElement).value = data[index]?.sickNm ?? '';
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (event.key === 'ArrowUp') {
        updateFocusedItem(selectedIndex - 1 <= -1 ? RESULT_LENGTH - 1 : selectedIndex - 1);
      } else if (event.key === 'ArrowDown') {
        updateFocusedItem(selectedIndex + 1 === RESULT_LENGTH ? 0 : selectedIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [selectedIndex, RESULT_LENGTH]);

  useEffect(() => {
    const fetchResult = async () => {
      if (keyword === '') {
        setSearchResult({ data: [], error: undefined });
        return;
      }

      setSelectedIndex(-1);

      const res = await cacheRepository.get(keyword);
      setSearchResult(res);
    };

    fetchResult();
  }, [keyword]);

  if (error) throw error;

  return (
    <StyledList>
      {keyword === '' && <StyledItem>최근검색어가 없습니다.</StyledItem>}
      {keyword !== '' && RESULT_LENGTH === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
      {data
        .filter((_, index) => index < RESULT_LENGTH)
        .map(({ sickNm }, index) => (
          <SickItem
            key={index}
            keyword={keyword}
            isSelected={selectedIndex === index}
            name={sickNm}
            handleMouseOver={() => updateFocusedItem(index)}
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

function SickItem({ keyword, isSelected, name, handleMouseOver }: SickItemProps) {
  const splited = name.split(keyword);

  return (
    <StyledSickItem $isSelected={isSelected} onMouseOver={handleMouseOver}>
      {splited.map((value, index) => (
        <span key={index}>
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

const StyledSickItem = styled(StyledItem)<{ $isSelected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? props.theme.focused : 'none')};
  color: ${(props) => props.theme.main};
  .highlight {
    color: ${(props) => props.theme.highlight};
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
