import React from "react";
import { Modal } from "antd";
import { IProduct } from "../../types";
import AddProductForm from "../Product/AddProductForm";

interface IModel {
  visible: boolean;
  handleCancel: () => void;
  product?: IProduct | null;
  handleProductDelete: () => void;
}

export const ModalEditProduct: React.FC<IModel> = ({
  visible,
  product,
  handleCancel,
  handleProductDelete,
}) => {
  if (!product) return <p></p>;

  return (
    <Modal
      title={product.DishOrDrink}
      onCancel={handleCancel}
      footer={null}
      open={visible}
    >
      <div className="modal">
        <AddProductForm
          product={{
            ...product,
            handleProductDelete: handleProductDelete,
          }}
        />
      </div>
    </Modal>
  );
};
