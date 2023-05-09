import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IProduct } from "../../types";
import DishCard from "./ProductCard";

interface ProductListProps {
  products: IProduct[];
  handleChange?: (
    event: React.SyntheticEvent<HTMLInputElement>,
    price: number,
    image: string,
    ingredients: string[],
    type: "dishes" | "drinks"
  ) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      {products.map((dish) => (
        <DishCard dish={dish} key={dish._id} />
      ))}
    </>
  );
};

export default ProductList;
