import { styled } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';

interface SearchAreaProps {
  isFocused: boolean;
  updateFocused: (isFocused: boolean) => void;
}

export default function SearchArea({ isFocused, updateFocused }: SearchAreaProps) {
  const styleTextField = {
    borderRadius: isFocused ? '20px 20px 0px 0px' : '20px'
  };

  return (
    <StyledSearchArea>
      <StyledTextField style={styleTextField} onFocus={() => updateFocused(true)}>
        <input type='text' placeholder='질환명을 입력해주세요' />
        <IconButton type='button'>
          <RiDeleteBack2Line />
        </IconButton>
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

const StyledTextField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.focused};
  padding: 15px;
  font-size: 1.25rem;

  input {
    font-size: inherit;
    background-color: transparent;
    border: none;
    width: 85%;
  }
  input:focus {
    outline: none;
    border: none;
  }
`;

const StyledSearchArea = styled.div``;
