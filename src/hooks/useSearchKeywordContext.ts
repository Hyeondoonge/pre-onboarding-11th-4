import { useContext } from 'react';
import { SearchKeywordContext } from 'contexts/SearchKeywordProvider';

export function useSearchKeywordContext() {
  const context = useContext(SearchKeywordContext);

  if (!context) {
    throw new Error(
      'SearchKeywordProvider가 트리에 존재하지 않습니다! SearchKeyword Context 접근을 위해 SearchKeywordProvider를 사용하려는 컴포넌트 외부에 선언해주세요.'
    );
  }

  return context;
}
