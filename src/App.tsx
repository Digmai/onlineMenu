import { Suspense, lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { fetchProduct } from "./slices/product";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import React from "react";
const MenuPage = lazy(() => import("./pages/MenuPage"));
const ChefPage = lazy(() => import("./pages/ChefPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const WaiterPage = lazy(() => import("./pages/WaiterPage"));
const BartenderPage = lazy(() => import("./pages/BartenderPage"));
const Notification = lazy(
  () => import("./components/Notification/Notification")
);
// import "bootstrap/dist/css/bootstrap.min.css";
// import { WebSocketProvider } from "./hooks/UseWebSocket";

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
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          {(user?.role === "cook" && <ChefPage />) ||
            (user?.role === "admin" && <AdminPage />) ||
            (user?.role === "waiter" && <WaiterPage />) ||
            (user?.role === "bartender" && <BartenderPage />) || <MenuPage />}
        </Suspense>
      ),
      errorElement: <Notification message={"error"} type="error" />,
    },
    {
      path: ":our",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          {(user?.role === "cook" && <ChefPage />) ||
            (user?.role === "admin" && <AdminPage />) ||
            (user?.role === "waiter" && <WaiterPage />) ||
            (user?.role === "bartender" && <BartenderPage />) || <MenuPage />}
        </Suspense>
      ),
    },

    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <LoginPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
