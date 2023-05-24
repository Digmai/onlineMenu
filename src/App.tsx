import { Suspense, lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./store";
import { fetchProduct } from "./slices/product";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import React from "react";
import { verifyToken } from "./slices/user";
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
  const [isMobile, setIsMobile] = useState(false);
  const { isLoading, user, error } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    // window.addEventListener("resize", handleResize);
    console.log("render");

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(verifyToken());
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
          {isMobile ? (
            <MenuPage />
          ) : (
            (user?.role === "cook" && <ChefPage />) ||
            (user?.role === "admin" && <AdminPage />) ||
            (user?.role === "waiter" && <WaiterPage />) ||
            (user?.role === "bartender" && <BartenderPage />) || <LoginPage />
          )}
        </Suspense>
      ),
      errorElement: <Notification message={"error"} type="error" />,
    },
    {
      path: ":our",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MenuPage />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
