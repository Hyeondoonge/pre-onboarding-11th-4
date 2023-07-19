import { BiSearch } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { ChangeEvent } from 'react';
import useDebounce from 'hooks/useDebounce';
import { useSearchKeywordContext } from 'hooks/useSearchKeywordContext';
import { getSearchURL } from 'utils/url';
import * as Styled from './SearchArea.styled';

interface SearchAreaProps {
  isFloating: boolean;
  setIsFloating: React.Dispatch<React.SetStateAction<boolean>>;
  fetchResult: (keyword: string) => void;
  initResult: () => void;
}

export default function SearchArea({
  isFloating,
  setIsFloating,
  fetchResult,
  initResult
}: SearchAreaProps) {
  const { keyword, setKeyword } = useSearchKeywordContext();
  const debounce = useDebounce();

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);

    debounce(() => fetchResult(value), 500);
  };

  const clickDeleteButtonHandler = () => {
    setKeyword('');
    initResult();
  };

  return (
    <Styled.SearchArea>
      <Styled.TextField $isFocused={isFloating} onFocus={() => setIsFloating(true)}>
        <input
          type='text'
          value={keyword}
          placeholder='질환명을 입력해주세요'
          onChange={changeInputHandler}
          onKeyDown={(event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault();
            }
          }}
        />
        {keyword !== '' && (
          <Styled.IconButton type='button' onClick={clickDeleteButtonHandler}>
            <RiDeleteBack2Line />
          </Styled.IconButton>
        )}
        <a href={getSearchURL(keyword)}>
          <Styled.IconButton type='button'>
            <BiSearch />
          </Styled.IconButton>
        </a>
      </Styled.TextField>
    </Styled.SearchArea>
  );
}
