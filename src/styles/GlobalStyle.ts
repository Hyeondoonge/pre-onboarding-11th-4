import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background-color: #dedede;
  }

  body {
    margin: 0;
  }

  #root {
    margin: auto;
    border-left: 0.5px solid black;
    border-right: 0.5px solid black;
    height: 100vh;
    width: 720px;
    background-color: ${(props) => props.theme.background};
  }
`;

export default GlobalStyle;
