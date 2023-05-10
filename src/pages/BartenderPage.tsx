import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/orders";
import { selectError } from "../slices/usersList";
import { RootState, useAppDispatch } from "../store";
import WebSocketService from "../services/WebSocketService";
import { Order } from "../types";
import { OrderList } from "../components/Order/OrderList";

const BartenderPage = () => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);

  useEffect(() => {
    // Get initial list of orders on mount
    dispatch(fetchOrders());

    // Initialize WebSocket for real-time updates
    const ws = WebSocketService.initializeWebSocket();

    // Set up listener for new orders
    ws.addEventListener("message", (event: { data: string }) => {
      const data = JSON.parse(event.data);
      if (data.type === "newOrder") {
        const newOrder: Order = data.order;
        dispatch(fetchOrders()); // Update orders list with new order
        Notification.showNotification(
          "Новый заказ",
          `Заказ #${newOrder._id} отправлен на кухню`
        );
      }
    });

    return () => {
      // Close WebSocket on unmount
      WebSocketService.closeWebSocket();
    };
  }, [dispatch]);

  return (
    <div className="page-container">
      <div className="content-container">
        {error && <p className="error-message">{error}</p>}
        <h1>Панель бармена</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default BartenderPage;
export const Notification = {
  showNotification: (title: string, message: string) => {
    const notificationElement = document.createElement("div");
    notificationElement.classList.add("notification");
    notificationElement.innerHTML = `
      <h2>${title}</h2>
      <p>${message}</p>
    `;
    document.body.appendChild(notificationElement);
    setTimeout(() => {
      notificationElement.classList.add("fade-out");
      setTimeout(() => {
        notificationElement.remove();
      }, 500);
    }, 3000);
  },
};
