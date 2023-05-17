import { useState, useEffect } from "react";
import { Tree } from "antd";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { IProduct, IProducts } from "../../types";
import type { DataNode, TreeProps } from "antd/es/tree";
import { extractLastNumber } from "../../utils/extractLastNumber";
import { ModalAddProductForm } from "../Modal/ModalAddProductForm";

export const ProductsTree: React.FC = () => {
  const productSelect = useSelector(
    (state: RootState) => state.product.product
  );

  const [visible, setVisible] = useState(false);
  const [editedProducts, setEditedProducts] = useState<IProducts>();
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    // Если выбран продукт, создать копию объекта editedProducts
    // с помощью оператора spread и обновить его с помощью метода setEditedProducts
    productSelect && setEditedProducts(productSelect);
  }, [productSelect]);

  if (!editedProducts) return <p>Loading...</p>;

  const treeData: DataNode[] = Object.keys(editedProducts).map(
    (category, index) => {
      return {
        title: category,
        key: String(index),
        children: Object.keys(editedProducts[category]).map(
          (subcategory, i) => {
            return {
              key: String(i) + " " + String(index),
              title: subcategory,
              children: editedProducts[category][subcategory].map(
                (product, i) => {
                  return {
                    title: product.name,
                    key: "0-0-0-" + product._id,
                  };
                }
              ),
            };
          }
        ),
      };
    }
  );

  const handleCancel = () => {
    setVisible(false);
    setProductId(null);
    // form.resetFields();
  };

  // Функция для удаления продукта из списка продуктов в категории и подкатегории
  const handleProductDelete = (
    category: string,
    subcategory: string,
    deletedProduct: IProduct
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
    setVisible(false);
  };

  function getProductById(id: string): IProduct | undefined {
    if (!productSelect) return undefined;
    for (let category in productSelect) {
      for (let subcategory in productSelect[category]) {
        const product = productSelect[category][subcategory].find(
          (p) => p._id === id
        );
        if (product) return product;
      }
    }
    return undefined;
  }

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    if (String(selectedKeys[0]).length < 6) return;
    setProductId(extractLastNumber(String(selectedKeys[0])));
    setVisible(true);
  };

  return (
    <>
      <ModalAddProductForm
        handleCancel={handleCancel}
        handleProductDelete={handleProductDelete}
        product={(productId && getProductById(productId)) || undefined}
        visible={visible}
      />
      <div className="products-list-admin-page">
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
    </>
  );
};
