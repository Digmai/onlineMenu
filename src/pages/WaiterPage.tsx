import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../slices/orders";
import { selectError } from "../slices/users";
import { RootState, useAppDispatch } from "../store";
import WebSocketService from "../services/WebSocketService";
import { Order } from "../types";
import { OrderList } from "../components/Order/OrderList";
import ProductList from "../components/Product/Products";

const WaiterPage = () => {
  const dispatch = useAppDispatch();
  const UserError = useSelector(selectError);
  const orders = useSelector((state: RootState) => state.orders.orders);

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
          `Заказ #${newOrder.id} готовится`
        );
      }
    });

    return () => {
      // Close WebSocket on unmount
      WebSocketService.closeWebSocket();
    };
  }, [dispatch]);

  const handleFinishOrder = (id: string) => {
    // Dispatch action to remove order from the list
    // TODO: implement
  };

  const handleSubmitOrder = (order: Order) => {
    // Dispatch action to submit new order
    // TODO: implement
  };

  return (
    <div className="page-container">
      <div className="content-container">
        {/* {productSelect.error && (
          <p className="error-message">{productSelect.error}</p>
        )} */}
        <h1>Панель официанта</h1>
        <div className="waiter-page__orders-list">
          <h2>Текущие заказы</h2>
          <OrderList />
        </div>
        <div className="waiter-page__menu-lists">
          <div className="waiter-page__dishes-list">
            <h2>Блюда</h2>
            {/* <ProductList products={productSelect.product} /> */}
          </div>
          {/* <div className="waiter-page__drinks-list">  
            <h2>Напитки</h2>       НУЖНО НАПИСАТЬ ЛОКИКУ ВЫБОРА ТО ТИТУ НАПИТОК ЭТО ИЛИ БЛЮДО 
            <DrinkList drinks={drinksSelect.drinks} />
          </div> */}
        </div>
        <div className="waiter-page__new-order-form">
          <h2>Добавить заказ</h2>
          {/* TODO: implement new order form */}
        </div>
      </div>
    </div>
  );
};

export default WaiterPage;
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
