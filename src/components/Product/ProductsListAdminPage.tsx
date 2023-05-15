import { useState, useEffect } from "react";
import { Card, Input, Button } from "antd";
import { IProduct, IProducts } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";

const ProductsListAdminPage: React.FC = () => {
  const productSelect = useSelector(
    (state: RootState) => state.product.product
  );

  const [editedProducts, setEditedProducts] = useState<IProducts>();
  useEffect(() => {
    // Если выбран продукт, создать копию объекта editedProducts
    // с помощью оператора spread и обновить его с помощью метода setEditedProducts
    productSelect && setEditedProducts(productSelect);
  }, [productSelect]);

  // Функция для удаления продукта из списка продуктов в категории и подкатегории
  const handleProductDelete = (
    deletedProduct: IProduct,
    category: string,
    subcategory: string
  ) => {
    // Создание копии editedProducts с помощью оператора spread
    const editedProductsCopy = { ...editedProducts };
    // Фильтрация продуктов по категории и подкатегории с помощью метода filter
    const editedSubcategoryProducts = editedProductsCopy[category][
      subcategory
    ].filter((product) => product._id !== deletedProduct._id);
    // Обновление массива продуктов в editedProductsCopy с помощью оператора spread
    editedProductsCopy[category] = {
      ...editedProductsCopy[category],
      [subcategory]: editedSubcategoryProducts,
    };

    // Обновление editedProducts с помощью метода setEditedProducts
    setEditedProducts(editedProductsCopy);
  };

  // Функция для редактирования продукта в списке продуктов в категории и подкатегории
  const handleProductEdit = (
    editedProduct: IProduct,
    category: string,
    subcategory: string
  ) => {
    // Создание копии editedProducts с помощью оператора spread
    const editedProductsCopy = { ...editedProducts };
    // Обновление продукта в списке продуктов по категории и подкатегории с помощью метода map
    const editedSubcategoryProducts = editedProductsCopy[category][
      subcategory
    ].map((product) => {
      if (product._id === editedProduct._id) {
        return editedProduct;
      }
      return product;
    });
    // Обновление массива продуктов в editedProductsCopy с помощью оператора spread
    editedProductsCopy[category] = {
      ...editedProductsCopy[category],
      [subcategory]: editedSubcategoryProducts,
    };

    // Обновление editedProducts с помощью метода setEditedProducts
    setEditedProducts(editedProductsCopy);
  };

  // Функция для отображения информации о продукте в карточке
  const renderProductCard = (product: IProduct) => {
    const { _id, name, price, image, category, subcategory, ingredients } =
      product;

    // Обработчик изменения свойства продукта
    const handleInputChange = (
      field: keyof IProduct, // задаем тип ключа как keyof IProduct
      value: string | number
    ) => {
      // Создание копии продукта с помощью оператора spread и обновление свойства
      let newProduct = { ...product, [String(field)]: value };
      // Обновление editedProducts с помощью метода handleProductEdit
      handleProductEdit(newProduct, category, subcategory);
    };

    return (
      <AddProduct
        product={{ ...product, handleProductDelete: handleProductDelete }}
      />
    );
  };

  return (
    <>
      {editedProducts &&
        Object.entries(editedProducts).map(([category, subcategories]) => {
          return Object.entries(subcategories).map(
            ([subcategory, products]) => {
              return (
                <>
                  <h2>{category}</h2>
                  <h3>{subcategory}</h3>
                  {products.map(renderProductCard)}
                </>
              );
            }
          );
        })}
    </>
  );
};

export default ProductsListAdminPage;
