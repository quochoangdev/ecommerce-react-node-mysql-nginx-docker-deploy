import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles/GlobalStyles";
import "./index.css";
import { store } from "./redux/Store";
import { Provider } from "react-redux";
import { CountCartProvider } from "./hooks/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CountCartProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles >
    </CountCartProvider>
  </Provider >
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
