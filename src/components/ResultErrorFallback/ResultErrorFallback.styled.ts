import { styled } from 'styled-components';

export const ResultErrorFallback = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 20px;
  color: ${(props) => props.theme.main};
`;
