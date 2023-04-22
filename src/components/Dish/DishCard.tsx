import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Dish } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...dish }));
  };

  return (
    <div className="dish-card item-card">
      <img src={dish.image} alt={dish.name} />
      <div className="dish-card-info item-card-info">
        <h3>{dish.name}</h3>
        <p>{formatCurrency(dish.price)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default DishCard;
