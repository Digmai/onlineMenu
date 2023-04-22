import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatCurrency } from "../../utils/formatCurrency";

export const OrderList: React.FC = () => {
  const auth = useSelector((state: RootState) => state.user.user);
  const [search, setSearch] = useState("");
  const orders = useSelector((state: RootState) => state.orders);

  const filteredOrders = orders.orders.filter((order) =>
    JSON.stringify(order).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Поиск заказов..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Заказчик</th>
            <th>Столик</th>
            <th>Блюда/Напитки</th>
            <th>Сумма заказа</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.total}</td>
              <td>{order.items.join(", ")}</td>
              {/* <td>{order.total.join(", ")}</td> */}
              <td>{formatCurrency(order.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!filteredOrders.length && <p>Заказы не найдены.</p>}
      {auth?.role === "waiter" && (
        <>
          <button>Заказ готов</button>
          <button>Отменить заказ</button>
        </>
      )}
    </>
  );
};
