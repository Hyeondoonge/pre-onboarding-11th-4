import ErrorBoundary from '../ErrorBoundary';
import ResultErrorFallback from '../ResultErrorFallback';
import { useEffect, useState } from 'react';
import { TResultResponse } from 'types/common';
import { useSearchKeywordContext } from 'hooks/useSearchKeywordContext';
import { getSearchURL } from 'utils/url';
import * as Styled from './Result.styled';

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

interface SickItemProps {
  keyword: string;
  isSelected: boolean;
  handleMouseOver: () => void;
  name: string;
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
    <Styled.Result>
      <Styled.Border>
        <div />
      </Styled.Border>
      <ErrorBoundary fallback={<ResultErrorFallback />}>
        <SickList searchResult={searchResult} loading={loading} />
      </ErrorBoundary>
    </Styled.Result>
  );
}

function SickList({ searchResult, loading }: ListProps) {
  const { keyword, setKeyword } = useSearchKeywordContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data, error } = searchResult;

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
  }, [searchResult]);

  if (error) throw error;

  return (
    <Styled.List>
      {loading ? (
        <Styled.Loading>로딩 중입니다</Styled.Loading>
      ) : (
        <>
          {keyword === '' && RESULT_LENGTH === 0 && (
            <Styled.Item>최근검색어가 없습니다.</Styled.Item>
          )}
          {keyword !== '' && RESULT_LENGTH === 0 && <Styled.Item>검색결과가 없습니다.</Styled.Item>}
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
    </Styled.List>
  );
}

function SickItem({ keyword, isSelected, name, handleMouseOver }: SickItemProps) {
  const splited = name.split(keyword);

  return (
    <Styled.SickItem $isSelected={isSelected} onMouseOver={handleMouseOver}>
      <a href={getSearchURL(name)}>
        {splited.map((value, index) => (
          <span key={index}>
            {value}
            {index !== splited.length - 1 && <span className='highlight'>{keyword}</span>}
          </span>
        ))}
      </a>
    </Styled.SickItem>
  );
}
