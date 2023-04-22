import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
