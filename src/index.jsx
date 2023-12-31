import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/style.scss";
import "./styles/variables.scss";
import "./assets/fonts/font.scss";
import { Provider } from "react-redux";
import store from "./utils/redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Provider store={store}>

    <App />
  
  </Provider>
 
);
reportWebVitals();
