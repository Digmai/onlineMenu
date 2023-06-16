import React, { useState, useEffect } from "react";
import { IProduct } from "../types";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { AdminPanel } from "../components/AdminPanel/AdminPanel";
import { filterProductsOnCategory } from "../utils/filterProducts";
import { selectAllProduct } from "../slices/product";

const AdminPage: React.FC = () => {
  // const auth = useSelector((state: RootState) => state.user.user?.role);

  // const [searchTerm, setSearchTerm] = useState("w");
  // const [filteredItems, setFilteredItems] = useState<{
  //   product: IProduct[];
  // }>({ product: [] });

  // const productSelect = useSelector(selectAllProduct);

  // let isLoading = productSelect.loading;
  // <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
  // useEffect(
  //   // Используем хук useEffect для выполнения действий при изменении строки сортировки (searchTerm)
  //   () => {
  //     if (!productSelect?.product) return;

  //     setFilteredItems({
  //       product: filterProductsOnCategory(productSelect.product, {
  //         category: searchTerm,
  //       }),
  //     });
  //   },
  //   [searchTerm, productSelect]
  // );
  return (
    <>
      <AdminPanel />
    </>
  );
};

export default AdminPage;
