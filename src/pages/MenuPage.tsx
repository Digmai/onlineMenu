import React, { useState, useEffect } from "react";
import { RootState } from "../store";
import { IProduct } from "../types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DishList from "../components/Dish/Dish";
import { Header } from "./../components/Header/Header";
import { Footer } from "./../components/Footer/Footer";
import Notification from "../components/Notification/Notification";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<{
    product: IProduct[];
  }>({ product: []});

  const dishesSelect = useSelector(
    (state: RootState) => state.product
  );


  let isLoading = dishesSelect.loading
  // <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;


  useEffect(
    // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
    () => {
      // Изменяем состояние setFilteredItems, фильтруя напитки на основе введённого searchTerm с помощью метода filter()
      setFilteredItems({
        product: dishesSelect.product.filter((dish: { name: string }) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),

      });
    },
    [searchTerm, dishesSelect]
  );

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, []);

  return (
    <>
      <Header />
      <div className="menu-page containerr">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {dishesSelect.error && <Notification message={dishesSelect.error} type="error" />}
            <div className="menu-page__header">Dishes</div>

            <div className="menu-page__section row">
              <DishList dishes={filteredItems.product} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MenuPage;

//  <>
//    <div className="menu-section container ">
//      <h2 className="menu-section-title">Dishes</h2>
//      {/* <DishList dishes={filteredItems.dishes} /> */}
//    </div>
//    <div className="menu-section container ">
//      <h2 className="menu-section-title">Drinks</h2>
//      {/* <DrinkList drinks={filteredItems.drinks} /> */}
//    </div>
//    <div className="cart-total">
//      Итого: {formatCurrency(0)}{" "}
//      {/* здесь будет подставляться общая сумма заказа */}
//    </div>
//  </>;
