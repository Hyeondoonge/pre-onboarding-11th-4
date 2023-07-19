import ErrorBoundary from 'components/ErrorBoundary';
import Result from 'components/Result';
import ResultErrorFallback from 'components/ResultErrorFallback';
import SearchArea from 'components/SearchArea';
import SearchKeywordProvider from 'contexts/SearchKeywordProvider';
import useSearchResult from 'hooks/useSearchResult';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);
  const { searchResult, fetchResult, initResult, loading } = useSearchResult();

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
    <SearchKeywordProvider>
      <StyledSearchPage>
        <div>
          <h2>국내 모든 임상시험 검색하고 온라인으로 참여하기</h2>
        </div>
        <div>
          <SearchArea
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            fetchResult={fetchResult}
            initResult={initResult}
          />
          {isFocused && (
            <ErrorBoundary fallback={<ResultErrorFallback />}>
              <Result
                searchResult={searchResult}
                fetchResult={fetchResult}
                initResult={initResult}
                loading={loading}
              />
            </ErrorBoundary>
          )}
        </div>
      </StyledSearchPage>
    </SearchKeywordProvider>
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
