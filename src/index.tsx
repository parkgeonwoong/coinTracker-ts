import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import router from "./Router";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Recoil */}
    <RecoilRoot>
      {/* React-Query  */}
      <QueryClientProvider client={queryClient}>
        {/* Router Provider */}
        <RouterProvider router={router} />
        {/* <App /> */}
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
