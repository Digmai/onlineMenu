import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { selectUser } from "../slices/user";
import { Header } from "../components/Header/Header";
import { IProduct, Drink as IDrink } from "../types";
import {
  addOrder,
  selectCarts,
  selectError,
  selectLoading,
  selectTotalPrice,
} from "../slices/orders";
import { OrderCart } from "../components/Order/OrderCart";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const totalPrice = useSelector(selectTotalPrice);
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

  //   <div className="order-page__menu">
  //   <div className="order-page__dishes">
  //     <h2>Блюда</h2>
  //     {renderDishes()}
  //   </div>
  //   <div className="order-page__drinks">
  //     <h2>Напитки</h2>
  //     {renderDrinks()}
  //   </div>
  // </div>
  // <div className="order-page__total">
  //   <h2>Итого: {order.total} ₽</h2>
  // </div>
  // <button
  //   className="order-page__button"
  //   onClick={handlePlaceOrder}
  //   disabled={loading}
  // >
  //   {loading ? "Оформление заказа..." : "Оформить заказ"}
  // </button>

  const handlePlaceOrder = () => {
    dispatch(addOrder());
  };

  const renderDishes = () => {
    return <p>123</p>; // <Dish dishes={orders} />;
  };

  const renderDrinks = () => {
    return <p>123</p>;
  };

  const Footer = () => {
    return (
      <div className="footer">
        <div className="footer__content">
          <Link to={"/"} className="order-page__footer-button icon-svg-color">
            <svg
              className="icon-svg-color icon-svg-chevron-left"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M20.7 267.3c-6.2-6.2-6.2-16.4 0-22.6l192-192c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6L54.6 256 235.3 436.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-192-192z" />
            </svg>
            Вернуться в меню
          </Link>
        </div>
      </div>
    );
  };
  if (totalPrice === 0)
    return (
      <>
        {" "}
        <Header />
        <div className="order-page">Корзина пуста</div>
        <Footer />
      </>
    );
  return (
    <>
      <Header />
      <OrderCart />
      <Footer />
    </>
  );
};

export default OrderPage;
