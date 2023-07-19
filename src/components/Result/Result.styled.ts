import styled from 'styled-components';

export const Result = styled.div`
  position: relative;
  width: 100%;

  background-color: ${(props) => props.theme.textBackground};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  color: ${(props) => props.theme.main};
  border: ${(props) => props.theme.textBorder};
  border-top: none;
`;

export const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

export const Item = styled.li`
  padding: 15px;
`;

export const SickItem = styled(Item)<{ $isSelected: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.$isSelected ? props.theme.focused : 'none')};

  .highlight {
    color: ${(props) => props.theme.highlight};
  }

  a {
    display: block;
    color: ${(props) => props.theme.main};
    text-decoration: none;
  }
`;

export const Border = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 95%;
    height: 1px;
    background-color: ${(props) => props.theme.border};
    position: absolute;
    top: 0;
  }
`;

export const Loading = styled.div`
  padding: 15px;
`;
