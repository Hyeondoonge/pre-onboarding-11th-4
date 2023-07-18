import ErrorBoundary from 'components/ErrorBoundary';
import Result from 'components/Result';
import ResultErrorFallback from 'components/ResultErrorFallback';
import SearchArea from 'components/SearchArea';
import { useState } from 'react';
import { styled } from 'styled-components';

export default function SearchPage() {
  const [isFocused, setIsFocused] = useState(false);

  const updateFocused = (isFocused: boolean) => {
    setIsFocused(isFocused);
  };

  return (
    <StyledSearchPage>
      <h2>국내 모든 임상시험 검색하고 온라인으로 참여하기</h2>
      <SearchArea isFocused={isFocused} updateFocused={updateFocused} />
      {isFocused && (
        <ErrorBoundary fallback={<ResultErrorFallback />}>
          <Result />
        </ErrorBoundary>
      )}
    </StyledSearchPage>
  );
}

const StyledSearchPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;

  h2 {
    color: ${(props) => props.theme.main};
  }
`;
