import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import router from "./Router";
import { darkTheme, lightTheme } from "./theme";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* React-Query  */}
    <QueryClientProvider client={queryClient}>
      {/* styled-components Provider */}
      <ThemeProvider theme={darkTheme}>
        {/* Router Provider */}
        <RouterProvider router={router} />
        {/* <App /> */}
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
