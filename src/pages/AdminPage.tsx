import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Notification from "../components/Notification/Notification";
import { Dish, Drink } from "../types";
import DishList from "../components/Dish/Dish";
import DrinkList from "../components/Drink/Drink";
import AddDishOrDrinkForm from "../components/AddDishForm/AddDishForm";
import { OrderList } from "../components/Order/OrderList";
import UserList from "../components/User/UserList";
import AddUserForm from "../components/User/AddUserForm";

const AdminPage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.user.user?.role);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<{
    dishes: Dish[];
    drinks: Drink[];
  }>({ dishes: [], drinks: [] });


  const dishesSelect = useSelector(
    (state: RootState) => state.dishes
  );

  const drinksSelect = useSelector(
    (state: RootState) => state.drinks
  );

  let isLoading = drinksSelect.loading && dishesSelect.loading
  // <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;


  useEffect(
    // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
    () => {
      // Изменяем состояние setFilteredItems, фильтруя напитки на основе введённого searchTerm с помощью метода filter()
      setFilteredItems({
        dishes: dishesSelect.dishes.filter((dish: { name: string }) =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        drinks: drinksSelect.drinks.filter((drink: { name: string }) =>
          drink.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      });
    },
    [searchTerm, dishesSelect, drinksSelect]
  );


  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>
      {auth !== "admin" && (
        <Notification
          message="Вы не авторизованы для доступа к панели администратора"
          type="error"
        />
      )}
      {auth === "admin" && (
        <>
          <h2>Меню</h2>
          <DishList dishes={filteredItems.dishes} />
          <AddDishOrDrinkForm isDishForm={true} />
          <DrinkList drinks={filteredItems.drinks} />
          <AddDishOrDrinkForm isDishForm={false} />
          <h2>Заказы</h2>
          <OrderList />
          <h2>Пользователи</h2>
          <UserList />
          <AddUserForm />
        </>
      )}
    </div>
  );
};

export default AdminPage;
