import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Dish } from "../../types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...dish }));
  };

  return (
    <div className="menu-item">
      {/* <div className="menu-item__image" /> */}
      <img src="https://source.unsplash.com/300x300/?tree,nature" alt="" />
      <div className="menu-item__info">{dish.name}</div>
    </div>
  );
};
export default DishCard;

// <div className="dish-card item-card">
//   <img src={dish.image} alt={dish.name} />
//   <div className="dish-card-info item-card-info">
//     <h3>{dish.name}</h3>
//     <p>{formatCurrency(dish.price)}</p>
//     <button onClick={handleAddToCart}>Add to Cart</button>
//   </div>
// </div>
