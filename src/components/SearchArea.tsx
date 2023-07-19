import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';
import { ChangeEvent, useEffect } from 'react';
import useDebounce from 'hooks/useDebounce';

interface SearchAreaProps {
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  fetchResult: (keyword: string) => void;
  initResult: () => void;
}

export default function SearchArea({
  isFocused,
  setIsFocused,
  keyword,
  setKeyword,
  fetchResult,
  initResult
}: SearchAreaProps) {
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
    <StyledSearchArea
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <StyledTextField $isFocused={isFocused} onFocus={() => setIsFocused(true)}>
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
          <IconButton type='button' onClick={clickDeleteButtonHandler}>
            <RiDeleteBack2Line />
          </IconButton>
        )}

        <IconButton type='button'>
          <BiSearch />
        </IconButton>
      </StyledTextField>
    </StyledSearchArea>
  );
}

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: inherit;
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
`;

const StyledTextField = styled.div<{ $isFocused: boolean }>`
  background-color: ${(props) => props.theme.textBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px;
  font-size: 1.25rem;

  input {
    color: ${(props) => props.theme.main};
    font-size: inherit;
    background-color: transparent;
    border: none;
    width: 85%;
  }
  input:focus {
    outline: none;
    border: none;
  }

  border-radius: ${(props) => (props.$isFocused ? '20px 20px 0px 0px' : '20px')};
  border: ${(props) => props.theme.textBorder};
  border-bottom: ${(props) => (props.$isFocused ? 'none' : props.theme.textBorder)};
`;

const StyledSearchArea = styled.div`
  width: 100%;
`;
