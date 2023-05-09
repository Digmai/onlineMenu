import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import ChefPage from "./pages/ChefPage";
import BartenderPage from "./pages/BartenderPage";
import WaiterPage from "./pages/WaiterPage";
import { RootState, useAppDispatch } from "./store";
import Notification from "./components/Notification/Notification";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { WebSocketProvider } from "./hooks/UseWebSocket";

import { fetchProduct } from "./slices/product";
import { fetchOrders } from "./slices/orders";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchProduct());
    // dispatch(fetchDishes());
    // dispatch(fetchOrders());
    // dispatch(fetchUsers());
  }, [dispatch]);
  // if (!error) {
  //   return <Notification message={"error"} type="error" />;
  // }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MenuPage />,
      errorElement: <Notification message={"error"} type="error" />,
    },
    {
      path: "order",
      element: <OrderPage />,
    },
    {
      path: "role",
      element: (user?.role === "admin" && <AdminPage />) ||
        (user?.role === "cook" && <ChefPage />) ||
        (user?.role === "bartender" && <BartenderPage />) ||
        (user?.role === "waiter" && <WaiterPage />) || <MenuPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
function fetchUsers(): any {
  console.log("Function not implemented.");
}
