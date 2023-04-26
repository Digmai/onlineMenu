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
  // http://source.unsplash.com/300x300/?tree,fast-food
  return (
    <div className="menu-item">
      <img src="f.jfif" alt="" />
      <div className="menu-item__info">
        <p className="menu-item__name"> Пица "Домашняя"</p>
      </div>
    </div>
  );
};
export default DishCard;
