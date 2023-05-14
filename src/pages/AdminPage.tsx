import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Notification from "../components/Notification/Notification";
import { IProduct } from "../types";
import AddDishOrDrinkForm from "../components/AddDishForm/AddDishForm";
import { OrderList } from "../components/Order/OrderList";
import UserList from "../components/User/UserList";
import AddUserForm from "../components/User/AddUserForm";
import { filterProductsOnCategory } from "../utils/filterProducts";
import ProductList from "../components/Product/ProductList";
import { AdminPanel } from "../components/AdminPanel/AdminPanel";
import AddTables from "../components/Tables/AddTables";

const AdminPage: React.FC = () => {
  const auth = useSelector((state: RootState) => state.user.user?.role);

  const [searchTerm, setSearchTerm] = useState("w");
  const [filteredItems, setFilteredItems] = useState<{
    product: IProduct[];
  }>({ product: [] });

  const productSelect = useSelector((state: RootState) => state.product);

  let isLoading = productSelect.loading;
  // <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  useEffect(
    // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
    () => {
      if (!productSelect.product) return;

      setFilteredItems({
        product: filterProductsOnCategory(productSelect.product, {
          category: searchTerm,
        }),
      });
    },
    [searchTerm, productSelect]
  );
  return (
    <>
      <AdminPanel />
    </>
  );
};

export default AdminPage;
