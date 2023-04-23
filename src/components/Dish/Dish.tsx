import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dish } from "../../types";
import DishCard from "./DishCard";

interface DishListProps {
  dishes: Dish[];
  handleChange?: (
    event: React.SyntheticEvent<HTMLInputElement>,
    price: number,
    image: string,
    ingredients: string[],
    type: "dishes" | "drinks"
  ) => void;
}

const DishList: React.FC<DishListProps> = ({ dishes }) => {
  return (
    <div className=" row ">
      {dishes.map((dish) => (
        <DishCard dish={dish} key={dish._id} />
      ))}
      {dishes.map((dish) => (
        <DishCard dish={dish} key={dish._id} />
      ))}{" "}
      {dishes.map((dish) => (
        <DishCard dish={dish} key={dish._id} />
      ))}
    </div>
  );
};

export default DishList;
