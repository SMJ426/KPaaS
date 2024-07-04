import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #ffffff;
    margin-left: 10%;
    margin-right:10%;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
