import ErrorBoundary from 'components/ErrorBoundary';
import Result from 'components/Result';
import ResultErrorFallback from 'components/ResultErrorFallback';
import SearchArea from 'components/SearchArea';
import { useState } from 'react';
import { styled } from 'styled-components';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState('');

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
        />
        {isFocused && (
          <ErrorBoundary fallback={<ResultErrorFallback />}>
            <Result />
          </ErrorBoundary>
        )}
      </div>
    </StyledSearchPage>
  );
}

const StyledSearchPage = styled.div`
  height: 100vh;
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
