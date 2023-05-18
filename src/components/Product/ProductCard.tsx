import React, { useState } from "react";
import { IProduct } from "../../types";
import { ModelProduct } from "../Modal/ModelProduct";

interface DishCardProps {
  dish: IProduct;
}

const ProductCard: React.FC<DishCardProps> = ({ dish }) => {
  const [visible, setVisible] = useState(false);

  const handleCancel = () => {
    setVisible(false);
    // form.resetFields();
  };

  const showModal = () => {
    setVisible(true);
  };

  // http://source.unsplash.com/300x300/?tree,fast-food
  return (
    <>
      <ModelProduct
        handleCancel={handleCancel}
        visible={visible}
        product={dish}
      />
      <div className="menu-item" onClick={showModal}>
        <img src={dish.image} alt="" />
        <div className="menu-item__info">
          <p className="menu-item__name">{dish.name}</p>
        </div>
      </div>
    </>
  );
};
export default ProductCard;
