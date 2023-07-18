import { styled } from 'styled-components';

export default function ResultErrorFallback() {
  return (
    <StyledResultErrorFallback>
      <div>
        <div>검색도중 오류가 발생하여</div>
        <div>결과를 불러올 수 없습니다</div>
      </div>
      <div>불편함을 드려 죄송합니다</div>
    </StyledResultErrorFallback>
  );
}

const StyledResultErrorFallback = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 20px;
  color: ${(props) => props.theme.main};
`;
