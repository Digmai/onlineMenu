import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Dish, Drink } from "../types";
import DishList from "../components/Dish/Dish";
import DrinkList from "../components/Drink/Drink";
import SearchBar from "../components/SearchBar/SearchBar";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Notification from "../components/Notification/Notification";
import { useNavigate } from "react-router-dom";
import { Header } from "./../components/Header/Header";
import { Footer } from "./../components/Footer/Footer";

const MenuPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<{
    dishes: Dish[];
    drinks: Drink[];
  }>({ dishes: [], drinks: [] });

  const { dishes, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );

  const { drinks, isLoading, isError } = useSelector(
    (state: RootState) => state.drinks
  );
  // <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;

  useEffect(() => {
    // 👇 Redirects to about page, note the `replace: true`
    navigate("/", { replace: true });
  }, []);
  useEffect(
    // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
    () => {
      // Изменяем состояние setFilteredItems, фильтруя напитки на основе введённого searchTerm с помощью метода filter()
      setFilteredItems({
        dishes: dishes.filter((dish: { name: string }) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        drinks: drinks.filter((drink: { name: string }) =>
          drink.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      });
    },
    [searchTerm, dishes, drinks]
  );

  return (
    <>
      <Header />
      <div className="menu-page containerr">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {error && <Notification message={error} type="error" />}
            <div className="menu-page__header">Dishes</div>

            <div className="menu-page__section row">
              <DishList dishes={filteredItems.dishes} />
            </div>
            <div className="menu-page__section row">
              <DishList dishes={filteredItems.dishes} />
            </div>
            <div className="menu-page__section row">
              <DishList dishes={filteredItems.dishes} />
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
