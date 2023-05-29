import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Button, Modal, Tree } from "antd";
import { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { IProduct, IProducts } from "../../types";
import type { DataNode, TreeProps } from "antd/es/tree";
import { ModalEditProduct } from "../Modal/ModalEditProduct";
import { extractLastNumber } from "../../utils/extractLastNumber";

const ProductsTree: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [treeData, setTreeData] = useState<DataNode[]>();
  const [openSaveChanges, setOpenSaveChanges] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [editedProducts, setEditedProducts] = useState<IProducts>();
  const productSelect = useSelector(
    (state: RootState) => state.product.product
  );

  useEffect(() => {
    productSelect && setEditedProducts(productSelect);
  }, [productSelect]);

  useEffect(() => {
    editedProducts &&
      setTreeData(
        Object.keys(editedProducts).map((category, index) => {
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
        })
      );
  }, [editedProducts]);

  if (!editedProducts) return <p>Loading...</p>;

  const handleCancel = () => {
    setVisible(false);
    setProductId(null);
    // form.resetFields();
  };

  const handleDeleteProduct = () => {
    if (!productId) return;
    productDelete(getProductById(productId));
    setVisible(false);
  };

  const handleCancelEdit = () => {
    setVisibleEdit(false);
    setProductId(null);
    // form.resetFields();
  };

  // Функция для удаления продукта из списка продуктов в категории и подкатегории
  const productDelete = (deletedProduct: IProduct | undefined) => {
    if (!deletedProduct) return new Error("productDelete is null or undefined");
    // Создание копии editedProducts с помощью оператора spread
    const editedProductsCopy = { ...editedProducts };
    // Фильтрация продуктов по категории и подкатегории с помощью метода filter
    const editedSubcategoryProducts = editedProductsCopy[
      deletedProduct.category
    ][deletedProduct.subcategory].filter(
      (product) => product._id !== deletedProduct._id
    );
    // Обновление массива продуктов в editedProductsCopy с помощью оператора spread
    editedProductsCopy[deletedProduct.category] = {
      ...editedProductsCopy[deletedProduct.category],
      [deletedProduct.subcategory]: editedSubcategoryProducts,
    };

    // Обновление editedProducts с помощью метода setEditedProducts
    setEditedProducts(editedProductsCopy);
    setVisibleEdit(false);
    setProductId(null);
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
    setVisibleEdit(true);
  };

  const handleProductDelete = () => {
    setVisible(true);
    setVisibleEdit(false);
  };

  const handleSaveChanges = () => {
    // отправка измененных данных на сервер
    // ...
    // очистка изменений и закрытие модального окна при успешной отправке
    setEditedProducts(undefined);
    setVisible(false);
  };

  const handleCancelChanges = () => {
    // отмена изменений
    productSelect && setEditedProducts(productSelect);
    setOpenSaveChanges(false);
  };

  // (под вопросом!)повесить два выпадающих списка одно для категории второе для суб-категории и две кнопки
  // для выбора действия удалить/изменить при изменение всплывает модальное окно с инпутом
  //
  const handleDeleteCategory = (category: string, subcategory?: string) => {
    // Создание копии editedProducts с помощью оператора spread
    const editedProductsCopy = { ...editedProducts };

    // Если указана подкатегория
    if (subcategory) {
      // Удаление подкатегории из editedProductsCopy с помощью оператора spread
      const { [subcategory]: deletedSubcategory, ...rest } =
        editedProductsCopy[category];
      editedProductsCopy[category] = { ...rest };
      // Обновление editedProducts с помощью метода setEditedProducts
      setEditedProducts(editedProductsCopy);
    } else {
      // Если удаление категории с подкатегориями
      if (editedProductsCopy[category]) {
        const { [category]: deletedCategory, ...rest } = editedProductsCopy;
        // Обновление editedProducts с помощью метода setEditedProducts
        setEditedProducts(rest);
      }
    }
    if (!treeData) return;
    // Фильтрация дерева категорий с помощью метода filter
    const filteredTreeData = treeData.filter((node) => {
      return (
        node.title !== category &&
        (node.children?.every((child) => {
          return child.title !== subcategory;
        }) ||
          true)
      );
    });

    // Обновление treeData с помощью метода setTreeData
    setTreeData(filteredTreeData);
  };

  return (
    // (под вопросом!)повесть вда выпадающих списка одно для категории второе для суб-категории и две кнопки
    // для выбора действия удалить/изменить при изменение всплывает модальное окно с инпутом
    //
    <>
      <Modal
        title="Сохранить изменнения?"
        open={openSaveChanges}
        onCancel={handleCancelChanges}
        footer={[
          <Button key="cancel" onClick={handleCancelChanges}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleSaveChanges}>
            Сохранить изменения
          </Button>,
        ]}
      ></Modal>
      <ModalEditProduct
        visible={visibleEdit}
        handleCancel={handleCancelEdit}
        handleProductDelete={() => handleProductDelete()}
        product={(productId && getProductById(productId)) || undefined}
      />
      <Modal
        open={visible}
        onCancel={handleCancel}
        onOk={handleDeleteProduct}
        title={"Подтвердить удаление"}
      />
      <div className="products-list-admin-page">
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          onSelect={onSelect}
          treeData={treeData}
        />
      </div>
      <Button
        key="submit"
        type="primary"
        disabled={productSelect === editedProducts}
        onClick={() => setOpenSaveChanges(true)}
      >
        Сохранить/отменить изменения
      </Button>
    </>
  );
};
export default ProductsTree;
