import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Drink } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Model } from "../Modal/Model";
// "https://source.unsplash.com/500x550/?tree,nature";
interface DishCardProps {
  drink: Drink;
}

const DrinkCard: React.FC<DishCardProps> = ({ drink }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    // form.resetFields();
  };
  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...drink }));
  };

  return(
  <>
  <Model handleCancel={handleCancel} visible={visible} product={drink} />
  <div className="menu-item" onClick={() => setVisible(true)}>
    <img src="f.jfif" alt="" />
    <div className="menu-item__info">
      <p className="menu-item__name">{drink.name}</p>
    </div>
  </div>
</>)
};

export default DrinkCard;
