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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";

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

  return (
    <div className="app">
      13
      {/* <WebSocketProvider> */}
      {/* {!isLoading ? ( */}
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        {user?.role === "admin" && (
          <Route path="/admin" element={<AdminPage />} />
        )}
        {user?.role === "cook" && <Route path="/chef" element={<ChefPage />} />}
        {user?.role === "bartender" && (
          <Route path="/bartender" element={<BartenderPage />} />
        )}
        {user?.role === "waiter" && (
          <Route path="/waiter" element={<WaiterPage />} />
        )}
        {/* {redirect("/menu")} */}
      </Routes>
      {/* ) 
      : (
        <div>go to login</div>
        // <redirect to="/login" />
      )} */}
      {error && <Notification message={error} type="error" />}
      {/* </WebSocketProvider> */}
    </div>
  );
}

export default App;
function fetchUsers(): any {
  console.log("Function not implemented.");
}
