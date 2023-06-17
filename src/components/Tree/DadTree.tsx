import { useSelector } from "react-redux";
import { selectAllProduct } from "../../slices/product";
import NewTree from "./Tree";
import { TreeDed } from "../../styled/tree";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { productTreeFormat } from "../../utils/productTreeFormat";
import { ModalEditProduct } from "../Modal/ModalEditProduct";
import { getProductById } from "../../utils/getProductById";

const DadTree: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [productId, setProductId] = useState<string | null>(null);

  const products = useSelector(selectAllProduct);

  if (!products) return <p>loading</p>;

  const tree = productTreeFormat(products);

  const handleVisibleModal = (productId: string) => {
    return () => {
      setVisible((e) => !e);
      setProductId(productId);
    };
  };

  const handleCancel = () => {
    setVisible((e) => !e);
    setProductId(null);
  };

  return (
    <>
      {productId && (
        <ModalEditProduct
          title={productId ? "Редактирование!" : "Подтвердить удаление"}
          visible={visible}
          handleCancel={handleCancel}
          product={getProductById(productId, products)}
        />
      )}

      <TreeDed>
        {tree &&
          tree.map((node) =>
            !!node.list ? (
              <NewTree
                title={node.title}
                list={node.list}
                callback={handleVisibleModal}
              >
                <Button
                  type="dashed"
                  htmlType="button"
                  onClick={handleVisibleModal("")}
                  className="add-product__form-item-submit-btn-delete-in-list-product"
                >
                  <DeleteOutlined />
                </Button>
              </NewTree>
            ) : (
              <p>{node.title}</p>
            )
          )}
      </TreeDed>
    </>
  );
};

export default DadTree;
