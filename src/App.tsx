/**
 * @desc: Router에서 App
 * @todo:
 * - Css 초기화
 * - font import
 * - ThemeProvider
 * - HelmetProvider
 * - 다크모드 토글 버튼
 */

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./models/atoms";
import { Outlet } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import styled, { ThemeProvider } from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { HelmetProvider } from "react-helmet-async";

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
          <Mode
            onClick={() => setDarkAtom((prev) => !prev)}
            aria-label="다크모드"
          >
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </Mode>

          {/* ReactQuery Devtool */}
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

export default App;
