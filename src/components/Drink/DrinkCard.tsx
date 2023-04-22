import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../slices/orders";
import { Drink } from "../../types";
import { formatCurrency } from "../../utils/formatCurrency";

interface DishCardProps {
  drink: Drink;
}

const DishCard: React.FC<DishCardProps> = ({ drink }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...drink }));
  };

  return (
    <div className="dish-card item-card">
      <img src={drink.image} alt={drink.name} />
      <div className="dish-card-info item-card-info">
        <h3>{drink.name}</h3>
        <p>{formatCurrency(drink.price)}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default DishCard;
