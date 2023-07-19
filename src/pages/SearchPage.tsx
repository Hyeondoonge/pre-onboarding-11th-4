import ErrorBoundary from 'components/ErrorBoundary';
import Result from 'components/Result';
import ResultErrorFallback from 'components/ResultErrorFallback';
import SearchArea from 'components/SearchArea';
import SearchKeywordProvider from 'contexts/SearchKeywordProvider';
import useFloating from 'hooks/useFloating';
import useSearchResult from 'hooks/useSearchResult';
import { styled } from 'styled-components';

export default function SearchPage() {
  const { isFloating, setIsFloating } = useFloating();
  const { searchResult, fetchResult, initResult, loading } = useSearchResult();

  return (
    <SearchKeywordProvider>
      <StyledSearchPage>
        <div>
          <h2>국내 모든 임상시험 검색하고 온라인으로 참여하기</h2>
        </div>
        <div onClick={(event) => event.stopPropagation()}>
          <StyledWrapper>
            <SearchArea
              isFloating={isFloating}
              setIsFloating={setIsFloating}
              fetchResult={fetchResult}
              initResult={initResult}
            />
            {isFloating && (
              <ErrorBoundary fallback={<ResultErrorFallback />}>
                <Result
                  searchResult={searchResult}
                  fetchResult={fetchResult}
                  initResult={initResult}
                  loading={loading}
                />
              </ErrorBoundary>
            )}
          </StyledWrapper>
        </div>
      </StyledSearchPage>
    </SearchKeywordProvider>
  );
}

const StyledWrapper = styled.div`
  box-shadow: ${(props) => props.theme.shadow};
  border-radius: 20px;
`;

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
