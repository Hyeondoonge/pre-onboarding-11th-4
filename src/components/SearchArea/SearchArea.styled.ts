import styled from 'styled-components';

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: inherit;
  color: ${(props) => props.theme.secondary};
  cursor: pointer;
`;

export const TextField = styled.div<{ $isFocused: boolean }>`
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

export const SearchArea = styled.div`
  width: 100%;
`;
