import React from "react";
import { IProduct } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { selectUser } from "../slices/user";
import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { OrderCart } from "../components/Order/OrderCart";
import { addOrder, selectTotalPrice } from "../slices/orders";
import { OrderFooter } from "../components/Order/OrderFooter";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const totalPrice = useSelector(selectTotalPrice);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.user?.role !== "customer") {
      navigate("/");
    }
  }, [navigate]);
  // const [order, setOrder] = useState({
  //   _id: "",
  //   name: "",
  //   product: [] as IProduct[],
  //   total: 0,
  //   type: "",
  // });

  // useEffect(() => {
  //   if (!!user) {
  //     setOrder((prevOrder) => ({
  //       ...prevOrder,
  //       ...user.user,
  //       customer_id: user.user?._id,
  //       customer_name: `${user?.user?.name} ${user?.user?.role}`,
  //     }));
  //   }
  // }, [user]);

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

  if (totalPrice === 0)
    return (
      <>
        {" "}
        <Header />
        <div className="order-page">Корзина пуста</div>
        <OrderFooter />
      </>
    );
  return (
    <>
      <Header />
      <OrderCart />
      <OrderFooter />
    </>
  );
};

export default OrderPage;
