import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import client from "./services/apolloClient.ts";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import { CurtainProvider } from "./hooks/useCourtain";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CurtainProvider>
        <App />
      </CurtainProvider>
    </ApolloProvider>
  </React.StrictMode>
);
