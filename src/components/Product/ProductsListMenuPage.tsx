import React from "react";
import { IProduct } from "../../types";
import { RootState } from "../../store";
import ProductList from "./ProductList";
import { useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { getProductsByCategory } from "../../utils/getProductsByCategory";

interface Props {
  category: string | null;
  subcategory: string | null;
}

export const ProductsListMenu: React.FC<Props> = ({
  category,
  subcategory,
}) => {
  const productSelect = useSelector((state: RootState) => state.product);

  const Renders = () => {
    if (!productSelect.product) return <LoadingSpinner />;
    if (!category && subcategory) {
      const prodcts = getProductsByCategory<{
        [subcategory: string]: IProduct[];
      }>(productSelect.product, subcategory);
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
                          <ProductList
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
      const prodcts = getProductsByCategory(productSelect.product, category);
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
                            <ProductList
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
        {productSelect.product &&
          Object.keys(productSelect.product).map((category, i) => {
            // Добавляем проверку на наличие подкатегорий в категории
            if (productSelect.product && !productSelect.product[category]) {
              return null;
            }

            return (
              <div key={i}>
                <div key={`${i}-${category}`} className="menu-page__header">
                  {category}
                </div>

                <div className="menu-page__section row">
                  {productSelect.product &&
                    Object.entries(productSelect.product[category]).map(
                      ([subcategory, arr], j) => {
                        // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                        const products = arr.map((product) => ({
                          ...product,
                        }));

                        return (
                          <ProductList
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
