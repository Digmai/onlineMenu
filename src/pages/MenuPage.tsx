import React, { useState, useEffect } from "react";
import { RootState } from "../store";
import { IProduct } from "../types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "./../components/Header/Header";
import { Footer } from "./../components/Footer/Footer";
import Notification from "../components/Notification/Notification";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ProductList from "../components/Product/ProductList";
import { filterProductsOnCategory } from "../utils/filterProducts";

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("Пица");
  const [filteredItems, setFilteredItems] = useState<{
    product: IProduct[];
  }>({ product: [] });

  const productSelect = useSelector((state: RootState) => state.product);

  let isLoading = productSelect.loading;
  useEffect(
    // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
    () => {
      if (!productSelect.product) return;

      setFilteredItems({
        product: filterProductsOnCategory(productSelect.product, {
          subcategory: searchTerm,
          category: "Кухня",
        }),
      });
    },
    [searchTerm, productSelect]
  );

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, []);

  if (!productSelect.product) return <div>null dishesSelect.product</div>;
  console.log(productSelect.product);
  return (
    <>
      <Header />
      <div className="menu-page containerr">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {productSelect.error && (
              <Notification message={productSelect.error} type="error" />
            )}
            <div className="menu-page__header">{} 👇</div>

            <div className="menu-page__section row">
              <ProductList products={filteredItems.product} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;
