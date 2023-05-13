import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./scss/index.scss";

import { createRoot } from "react-dom/client";

const element = document.getElementById("root");
const root = createRoot(element!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
