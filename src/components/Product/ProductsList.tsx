import React from "react";
import { IProduct } from "../../types";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getProductsByCategory } from "../../utils/getProductsByCategory";
import { selectAllProduct } from "../../slices/product";
import Products from "./Products";

interface Props {
  category: string | null;
  subcategory: string | null;
}

export const ProductsList: React.FC<Props> = ({ category, subcategory }) => {
  const productSelect = useSelector(selectAllProduct);

  const Renders = () => {
    if (!productSelect) return <LoadingSpinner />;

    if (!category && subcategory) {
      const prodcts = getProductsByCategory<{
        [subcategory: string]: IProduct[];
      }>(productSelect, subcategory);
      return (
        <>
          {prodcts &&
            Object.keys(prodcts).map((subcategory, i) => {
              // Добавляем проверку на наличие подкатегорий в категории
              if (prodcts && !prodcts[subcategory]) {
                return null;
              }

              return (
                <>
                  <div key={i} className="menu-page__header">
                    {subcategory}
                  </div>

                  <div
                    key={`${i}-${subcategory}`}
                    className="menu-page__section row"
                  >
                    {prodcts &&
                      Object.entries(prodcts).map(([subcategory, arr], j) => {
                        // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                        const products = arr.map((product) => ({
                          ...product,
                        }));

                        return (
                          <Products
                            key={`${i}-${j}-${subcategory}`}
                            products={products}
                          />
                        );
                      })}
                  </div>
                </>
              );
            })}
        </>
      );
    }
    if (category && !subcategory) {
      const prodcts = getProductsByCategory(productSelect, category);
      return (
        <>
          {prodcts &&
            Object.keys(prodcts).map((category, i) => {
              // Добавляем проверку на наличие подкатегорий в категории
              if (prodcts && !prodcts[category]) {
                return null;
              }

              return (
                <>
                  <div key={i} className="menu-page__header">
                    {category}
                  </div>

                  <div
                    key={`${i}-${category}`}
                    className="menu-page__section row"
                  >
                    {prodcts &&
                      Object.entries(prodcts[category]).map(
                        ([subcategory, arr], j) => {
                          // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                          const products = arr.map((product) => ({
                            ...product,
                          }));

                          return (
                            <Products
                              key={`${i}-${j}-${subcategory}`}
                              products={products}
                            />
                          );
                        }
                      )}
                  </div>
                </>
              );
            })}
        </>
      );
    }

    return (
      <>
        {productSelect &&
          Object.keys(productSelect).map((category, i) => {
            // Добавляем проверку на наличие подкатегорий в категории
            if (productSelect && !productSelect[category]) {
              return null;
            }

            return (
              <div key={i}>
                <div key={`${i}-${category}`} className="menu-page__header">
                  {category}
                </div>

                <div className="menu-page__section row">
                  {productSelect &&
                    Object.entries(productSelect[category]).map(
                      ([subcategory, arr], j) => {
                        // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                        const products = arr.map((product) => ({
                          ...product,
                        }));

                        return (
                          <Products
                            key={`${i}-${j}-${subcategory}`}
                            products={products}
                          />
                        );
                      }
                    )}
                </div>
              </div>
            );
          })}
      </>
    );
  };
  return <Renders />;
};
