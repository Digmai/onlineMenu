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
// import { WebSocketProvider } from "./hooks/UseWebSocket";
import "./App.css";
import { fetchDishes } from "./slices/dishes";
import { fetchDrinks } from "./slices/drinks";
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

function App() {
  const dispatch = useAppDispatch();
  const { isLoading, user, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // dispatch(fetchDrinks());
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
      element: (
        <div>
          <MenuPage />
          <Link to="/order">Go to order</Link>
        </div>
      ),
      errorElement: <Notification message={"error"} type="error" />,
    },
    {
      path: "order",
      element: (
        <div>
          <OrderPage />
          <Link to="/role">About Us</Link>
        </div>
      ),
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
