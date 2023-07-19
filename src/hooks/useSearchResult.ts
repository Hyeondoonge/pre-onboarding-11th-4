import { TResultResponse } from 'types/common';
import { cacheRepository } from 'Repository/CacheRepository';
import { useState } from 'react';

export default function useSearchResult() {
  const [searchResult, setSearchResult] = useState<TResultResponse>({ data: [], error: undefined });

  const fetchResult = async (keyword: string) => {
    if (keyword === '') {
      setSearchResult({ data: [], error: undefined });
      return;
    }

    const res = await cacheRepository.get(keyword);
    setSearchResult(res);
  };

  const initResult = () => {
    setSearchResult({ data: [], error: undefined });
  };

  return { searchResult, fetchResult, initResult };
}
