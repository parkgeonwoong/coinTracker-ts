/**
 * @desc: Router에서 App
 * @todo:
 * - Css 초기화
 * - font import
 * - ThemeProvider
 * - HelmetProvider
 * - 다크모드 토글 버튼
 */

import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkTheme, lightTheme } from "./theme";

import { HelmetProvider } from "react-helmet-async";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

function App() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <HelmetProvider>
        {/* styled-components Provider */}
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <Outlet />

          {/* 다크모드 토글 */}
          <Mode onClick={() => setDarkAtom((prev) => !prev)}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </Mode>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
}

const Mode = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 0.6rem;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  color: royalblue;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

// CSS reset styled-components 적용하기 Fragment사용 <>
const GlobalStyle = createGlobalStyle`
  // Font 가지고 오기  
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

// 수정
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif ;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  line-height: 1.3;
}
a {
  text-decoration: none;
  color: inherit;
}
`;

export default App;
