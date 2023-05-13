import React from "react";
import { IProduct } from "../../types";
import ProductCard from "./ProductCard";

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
        <ProductCard dish={dish} key={dish._id} />
      ))}
    </>
  );
};

export default ProductList;
