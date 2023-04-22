import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Dish, Drink } from "../types";
import DishList from "../components/Dish/Dish";
import DrinkList from "../components/Drink/Drink";
import SearchBar from "../components/SearchBar/SearchBar";
import { formatCurrency } from "../utils/formatCurrency";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Notification from "../components/Notification/Notification";

const MenuPage = () => {
  const dispatch = useDispatch();

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
    <div className="menu-page">
      <h1 className="page-title">Меню</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {error && <Notification message={error} type="error" />}
          <div className="menu-section">
            <h2 className="menu-section-title">Блюда</h2>
            <DishList dishes={filteredItems.dishes} />
          </div>
          <div className="menu-section">
            <h2 className="menu-section-title">Напитки</h2>
            <DrinkList drinks={filteredItems.drinks} />
          </div>
          <div className="cart-total">
            Итого: {formatCurrency(0)}{" "}
            {/* здесь будет подставляться общая сумма заказа */}
          </div>
        </>
      )}
    </div>
  );
};

export default MenuPage;
