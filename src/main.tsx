import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./index.css";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { apiFetcher } from "./services/api";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: apiFetcher
        }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SWRConfig>
    </RecoilRoot>
  </React.StrictMode>
);
