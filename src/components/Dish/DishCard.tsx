import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { IProduct } from "../../types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { Model } from "../Modal/Model";

interface DishCardProps {
  dish: IProduct;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
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
    dispatch(addItemToCart({ ...dish }));
  };
  // http://source.unsplash.com/300x300/?tree,fast-food
  return (
    <>
      <Model handleCancel={handleCancel} visible={visible} product={dish} />
      <div className="menu-item" onClick={() => setVisible(true)}>
        <img src={dish.image} alt="" />
        <div className="menu-item__info">
          <p className="menu-item__name">{dish.name}</p>
        </div>
      </div>
    </>
  );
};
export default DishCard;
