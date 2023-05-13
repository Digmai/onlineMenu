import { useEffect } from "react";
import { RootState } from "../store";
import { IProduct } from "../types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Footer } from "./../components/Footer/Footer";
import ProductList from "../components/Product/ProductList";
import Notification from "../components/Notification/Notification";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { getProductsByCategory } from "../utils/getProductsByCategory";
import { Header } from "../components/Header/Header";

const MenuPage = () => {
  const navigate = useNavigate();
  const puth = useParams();
  console.log("puth ==>", puth);

  const productSelect = useSelector((state: RootState) => state.product);
  const { category, subcategory } = useSelector(
    (state: RootState) => state.sortData
  );

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, [navigate]);

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
  return (
    <>
      <Header />
      <div className="menu-page containerr">
        <Renders />
        <Footer />
      </div>
    </>
  );
};

export default MenuPage;
