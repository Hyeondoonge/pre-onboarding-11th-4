import * as Styled from './ResultErrorFallback.styled';

export default function ResultErrorFallback() {
  return (
    <Styled.ResultErrorFallback>
      <div>
        <div>검색도중 오류가 발생하여</div>
        <div>결과를 불러올 수 없습니다</div>
      </div>
      <div>불편함을 드려 죄송합니다</div>
    </Styled.ResultErrorFallback>
  );
}
