import React, { useState, useEffect } from "react";
import { RootState } from "../store";
import { IProduct } from "../types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "./../components/Header/Header";
import { Footer } from "./../components/Footer/Footer";
import ProductList from "../components/Product/ProductList";
import Notification from "../components/Notification/Notification";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { filterProductsOnCategory } from "../utils/filterProducts";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../utils/getProductsByCategory";

const MenuPage = () => {
  const navigate = useNavigate();
  // const puth = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<{
    product: IProduct[];
  }>({ product: [] });

  const productSelect = useSelector((state: RootState) => state.product);
  const { category, subcategory, error, loading } = useSelector(
    (state: RootState) => state.sortData
  );

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, []);
  if (!productSelect.product) return <>null Menu</>;
  if (!category && subcategory) {
    const prod = getProductsByCategory<{ [subcategory: string]: IProduct[] }>(
      productSelect.product,
      subcategory
    );
    return (
      <>
        <Header />
        <div className="menu-page containerr">
          {productSelect.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {productSelect.error && (
                <Notification message={productSelect.error} type="error" />
              )}

              {prod &&
                Object.keys(prod).map((subcategory) => {
                  // Добавляем проверку на наличие подкатегорий в категории
                  if (prod && !prod[subcategory]) {
                    return null;
                  }

                  return (
                    <>
                      <div className="menu-page__header">{subcategory}</div>

                      <div className="menu-page__section row">
                        {prod &&
                          Object.entries(prod).map(([subcategory, arr]) => {
                            // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                            const products = arr.map((product) => ({
                              ...product,
                            }));

                            return (
                              <ProductList
                                key={subcategory}
                                products={products}
                              />
                            );
                          })}
                      </div>
                    </>
                  );
                })}
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
  if (category && !subcategory) {
    const prod = getProductsByCategory(productSelect.product, category);
    return (
      <>
        <Header />
        <div className="menu-page containerr">
          {productSelect.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {productSelect.error && (
                <Notification message={productSelect.error} type="error" />
              )}

              {prod &&
                Object.keys(prod).map((category) => {
                  // Добавляем проверку на наличие подкатегорий в категории
                  if (prod && !prod[category]) {
                    return null;
                  }

                  return (
                    <>
                      <div className="menu-page__header">{category}</div>

                      <div className="menu-page__section row">
                        {prod &&
                          Object.entries(prod[category]).map(
                            ([subcategory, arr]) => {
                              // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                              const products = arr.map((product) => ({
                                ...product,
                              }));

                              return (
                                <ProductList
                                  key={subcategory}
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
          )}
        </div>
        <Footer />
      </>
    );
  }
  if (!category && !subcategory) {
    return (
      <>
        <Header />
        <div className="menu-page containerr">
          {productSelect.loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {productSelect.error && (
                <Notification message={productSelect.error} type="error" />
              )}

              {productSelect.product &&
                Object.keys(productSelect.product).map((category) => {
                  // Добавляем проверку на наличие подкатегорий в категории
                  if (
                    productSelect.product &&
                    !productSelect.product[category]
                  ) {
                    return null;
                  }

                  return (
                    <>
                      <div className="menu-page__header">{category}</div>

                      <div className="menu-page__section row">
                        {productSelect.product &&
                          Object.entries(productSelect.product[category]).map(
                            ([subcategory, arr]) => {
                              // Трансформируем массивы продуктов в объекты, чтобы передать их в компонент
                              const products = arr.map((product) => ({
                                ...product,
                              }));

                              return (
                                <ProductList
                                  key={subcategory}
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
          )}
        </div>
        <Footer />
      </>
    );
  }
  return <>null Menu</>;
};

export default MenuPage;
