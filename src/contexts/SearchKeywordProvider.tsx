import { ReactNode, createContext, useState } from 'react';

interface SearchKeywordProviderProps {
  children: ReactNode;
}

export const SearchKeywordContext = createContext<{
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}>({
  keyword: '',
  setKeyword: () => {}
});

export default function SearchKeywordProvider({ children }: SearchKeywordProviderProps) {
  const [keyword, setKeyword] = useState('');

  return (
    <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchKeywordContext.Provider>
  );
}
