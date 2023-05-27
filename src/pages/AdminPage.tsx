import React, { useState, useEffect } from "react";
import { IProduct } from "../types";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { AdminPanel } from "../components/AdminPanel/AdminPanel";
import { filterProductsOnCategory } from "../utils/filterProducts";

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
