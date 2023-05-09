import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllProduct } from "../slices/product";
import { selectUser } from "../slices/user";
import {
  addOrder,
  selectError,
  selectLoading,
  selectOrders,
} from "../slices/orders";
import Notification from "../components/Notification/Notification";
import { IProduct, Drink as IDrink, OrderItem } from "../types";
import Dish from "../components/Product/ProductList";
import { useAppDispatch } from "../store";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  // const orders = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [order, setOrder] = useState({
    _id: "",
    name: "",
    product: [] as IProduct[],
    total: 0,
    type: "",
  });

  useEffect(() => {
    if (!!user) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        ...user.user,
        customer_id: user.user?._id,
        customer_name: `${user?.user?.name} ${user?.user?.role}`,
      }));
    }
  }, [user]);

  // const handleCheckboxChange = (
  //   event: React.SyntheticEvent<HTMLInputElement>,
  //   price: number,
  //   image: string,
  //   ingredients: string[],
  //   type: "dishes" | "drinks", // 'dishes' or 'drinks'
  //   CookingTime = 10
  // ) => {
  //   const { id, name } = event.currentTarget;
  //   const isChecked = event.currentTarget.checked;

  //   let dishOrDrink: IDish | IDrink;

  //   dishOrDrink = {
  //     _id: id,
  //     name,
  //     price,
  //     image,
  //     ingredients,
  //     CookingTime: CookingTime,
  //   };

  //   if (isChecked) {
  //     setOrder((prevOrder) => ({
  //       ...prevOrder,
  //       [type]: [...prevOrder[type], dishOrDrink],
  //       total: prevOrder.total + price,
  //     }));
  //   } else {
  //     setOrder((prevOrder) => {
  //       const updatedItems = prevOrder[type].filter(
  //         (currentItem) => currentItem._id !== id
  //       );
  //       return {
  //         ...prevOrder,
  //         [type]: updatedItems,
  //         total: prevOrder.total - price,
  //       };
  //     });
  //   }
  // };
  const handlePlaceOrder = () => {
    dispatch(addOrder());
  };

  const renderDishes = () => {
    return <p>123</p>; // <Dish dishes={orders} />;
  };

  const renderDrinks = () => {
    return <p>123</p>;
  };

  return (
    <div className="order-page">
      <h1>Заказ</h1>
      <div className="order-page__menu">
        <div className="order-page__dishes">
          <h2>Блюда</h2>
          {renderDishes()}
        </div>
        <div className="order-page__drinks">
          <h2>Напитки</h2>
          {renderDrinks()}
        </div>
      </div>
      <div className="order-page__total">
        <h2>Итого: {order.total} ₽</h2>
      </div>
      <button
        className="order-page__button"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? "Оформление заказа..." : "Оформить заказ"}
      </button>
      {error && <Notification message={error} type={"error"} />}
    </div>
  );
};

export default OrderPage;
