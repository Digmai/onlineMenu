import React from "react";
import { Drink } from "../../types";
import DrinkCard from "./DrinkCard";

interface DishListProps {
  drinks: Drink[];
  handleChange?: (
    event: React.SyntheticEvent<HTMLInputElement>,
    price: number,
    image: string,
    ingredients: string[],
    type: "dishes" | "drinks"
  ) => void;
}

const DrinkList: React.FC<DishListProps> = ({ drinks }) => {
  return (
    <div className="dish-list card row">
      {drinks.map((dish) => (
        <DrinkCard drink={dish} key={dish._id} />
      ))}
    </div>
  );
};

export default DrinkList;
