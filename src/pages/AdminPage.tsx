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

  const { dishes, loading, error } = useSelector(
    (state: RootState) => state.dishes
  );

  const { drinks, isLoading, isError } = useSelector(
    (state: RootState) => state.drinks
  );

  useEffect(() => {
    setFilteredItems({
      // Фильтруем блюда на основе введенного searchTerm с помощью метода filter().
      dishes: dishes.filter((dish: Dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
      // Фильтруем напитки на основе введенного searchTerm с помощью метода filter().
      drinks: drinks.filter((drink: Drink) =>
        drink.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    });
  }, [searchTerm, dishes, drinks]);

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
