import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Drink } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
// "https://source.unsplash.com/500x550/?tree,nature";
interface DishCardProps {
  drink: Drink;
}

const DrinkCard: React.FC<DishCardProps> = ({ drink }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...drink }));
  };

  return <div className=""></div>;
};

export default DrinkCard;
