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

const MenuPage = () => {
  const navigate = useNavigate();
  const puth = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<{
    product: IProduct[];
  }>({ product: [] });

  console.log(puth.category);

  const productSelect = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (!productSelect.product) return;

    setFilteredItems({
      product: filterProductsOnCategory(productSelect.product, {}),
    });
  }, [searchTerm, productSelect]);

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, []);

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
                if (productSelect.product && !productSelect.product[category]) {
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
};

export default MenuPage;
