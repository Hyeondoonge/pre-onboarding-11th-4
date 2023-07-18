import { styled } from 'styled-components';

export default function Result() {
  return <StyledResult>검색 결과</StyledResult>;
}

const StyledResult = styled.div`
  background-color: ${(props) => props.theme.focused};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 15px;
`;
