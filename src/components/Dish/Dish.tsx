import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IProduct } from "../../types";
import DishCard from "./DishCard";

interface DishListProps {
  dishes: IProduct[];
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
    <>
      {dishes.map((dish) => (
        <DishCard dish={dish} key={dish._id} />
      ))}
    </>
  );
};

export default DishList;
