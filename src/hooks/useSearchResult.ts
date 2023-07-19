import { TResultResponse } from 'types/common';
import { cacheRepository } from 'Repository/CacheRepository';
import { useState } from 'react';

export default function useSearchResult() {
  const [searchResult, setSearchResult] = useState<TResultResponse>({ data: [], error: undefined });
  const [loading, setLoading] = useState(false);

  const fetchResult = async (keyword: string) => {
    if (keyword === '') {
      setSearchResult({ data: [], error: undefined });
      return;
    }

    setLoading(true);
    const res = await cacheRepository.get(keyword);
    setSearchResult(res);
    setLoading(false);
  };

  const initResult = () => {
    setSearchResult({ data: [], error: undefined });
  };

  return { searchResult, fetchResult, initResult, loading };
}
