import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/style.scss";
import "./styles/variables.scss";
import "./assets/fonts/font.scss";
import ErrorBoundary from "./components/errors/ErrorBoundery";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  </React.StrictMode>
);
reportWebVitals();
