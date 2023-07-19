import { cacheRepository } from 'Repository/CacheRepository';
import ErrorBoundary from 'components/ErrorBoundary';
import Result from 'components/Result';
import ResultErrorFallback from 'components/ResultErrorFallback';
import SearchArea from 'components/SearchArea';
import useDebounce from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { TResultResponse } from 'types/common';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<TResultResponse>({ data: [], error: undefined });

  const debounce = useDebounce();

  const fetchResult = (keyword: string) =>
    debounce(async () => {
      if (keyword === '') {
        setSearchResult({ data: [], error: undefined });
        return;
      }

      const res = await cacheRepository.get(keyword);
      setSearchResult(res);
    }, 500);

  const initResult = () => {
    setSearchResult({ data: [], error: undefined });
  };

  useEffect(() => {
    const handleWindowClick = () => {
      setIsFocused(false);
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <StyledSearchPage>
      <div>
        <h2>국내 모든 임상시험 검색하고 온라인으로 참여하기</h2>
      </div>
      <div>
        <SearchArea
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          keyword={keyword}
          setKeyword={setKeyword}
          fetchResult={fetchResult}
          initResult={initResult}
        />
        {isFocused && (
          <ErrorBoundary fallback={<ResultErrorFallback />}>
            <Result keyword={keyword} searchResult={searchResult} setKeyword={setKeyword} />
          </ErrorBoundary>
        )}
      </div>
    </StyledSearchPage>
  );
}

const StyledSearchPage = styled.div`
  padding: 50px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.25rem;
  gap: 20px;

  & > div:nth-child(1) {
    width: 65%;
    text-align: center;
    color: ${(props) => props.theme.main};
  }

  & > div:nth-child(2) {
    width: 100%;
  }
`;
