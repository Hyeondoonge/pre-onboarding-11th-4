import { styled } from 'styled-components';
import ErrorBoundary from './ErrorBoundary';
import ResultErrorFallback from './ResultErrorFallback';
import { useEffect, useRef, useState } from 'react';
import { TResultResponse } from 'types/common';
import { useSearchKeywordContext } from 'hooks/useSearchKeywordContext';

interface ResultProps {
  searchResult: TResultResponse;
  fetchResult: (keyword: string) => void;
  initResult: () => void;
  loading: boolean;
}
interface ListProps {
  searchResult: TResultResponse;
  loading: boolean;
}

export default function Result({ searchResult, fetchResult, initResult, loading }: ResultProps) {
  const { keyword } = useSearchKeywordContext();
  useEffect(() => {
    if (keyword) fetchResult(keyword);

    return () => {
      initResult();
    };
  }, []);

  return (
    <StyledResult>
      <StyledBorder>
        <div />
      </StyledBorder>
      <ErrorBoundary fallback={<ResultErrorFallback />}>
        <List searchResult={searchResult} loading={loading} />
      </ErrorBoundary>
    </StyledResult>
  );
}

function List({ searchResult, loading }: ListProps) {
  const { keyword, setKeyword } = useSearchKeywordContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data, error } = searchResult;
  const matchingKeyword = useRef(keyword);

  const MAX_LENGTH = 10;
  const RESULT_LENGTH = Math.min(MAX_LENGTH, data.length);

  const updateFocusedItem = (index: number) => {
    if (!data[index]) return;
    setSelectedIndex(index);
    setKeyword(data[index]?.sickNm ?? '');
    // TODO: data[index] undefined 오류
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
    setSelectedIndex(-1);
    matchingKeyword.current = keyword;
  }, [searchResult]);

  if (error) throw error;

  return (
    <StyledList>
      {loading ? (
        <StyledLoading>로딩 중입니다</StyledLoading>
      ) : (
        <>
          {keyword === '' && RESULT_LENGTH === 0 && <StyledItem>최근검색어가 없습니다.</StyledItem>}
          {keyword !== '' && RESULT_LENGTH === 0 && <StyledItem>검색결과가 없습니다.</StyledItem>}
          {data
            .filter((_, index) => index < RESULT_LENGTH)
            .map(({ sickNm }, index) => (
              <SickItem
                key={index}
                keyword={keyword}
                isSelected={selectedIndex === index}
                name={sickNm}
                handleMouseOver={() => {
                  setSelectedIndex(index);
                }}
              />
            ))}
        </>
      )}
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
  const HYPER_LINK = `https://clinicaltrialskorea.com/studies?conditions=${encodeURI(name)}`;

  return (
    <StyledSickItem $isSelected={isSelected} onMouseOver={handleMouseOver}>
      <a href={HYPER_LINK}>
        {splited.map((value, index) => (
          <span key={index}>
            {value}
            {index !== splited.length - 1 && <span className='highlight'>{keyword}</span>}
          </span>
        ))}
      </a>
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

  .highlight {
    color: ${(props) => props.theme.highlight};
  }

  a {
    color: ${(props) => props.theme.main};
    text-decoration: none;
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

const StyledLoading = styled.div`
  padding: 15px;
`;
