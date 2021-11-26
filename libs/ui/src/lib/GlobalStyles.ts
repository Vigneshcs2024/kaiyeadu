import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html,
  body {
    font-family: "Poppins", sans-serif;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }
  @media (max-width: 850px) {
    html {
      font-size: 56.25%;
    }
  }
  @media (max-width: 600px) {
    html {
      font-size: 50%;
    }
  }
  :target {
    animation: background-fade 10s forwards;
    -webkit-animation: background-fade 3s forwards; /* Safari 4+ */
    -moz-animation:    background-fade 3s forwards; /* Fx 5+ */
    -o-animation:      background-fade 3s forwards; /* Opera 12+ */
    animation:         background-fade 3s forwards;
  }
  body::-webkit-scrollbar {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  body::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
`;

export default GlobalStyle;
