import React from "react";
import { Modal } from "antd";
import { IProduct } from "../../types";
import AddProductForm from "../Product/AddProductForm";

interface IModel {
  title: string;
  visible: boolean;
  handleCancel: () => void;
  product?: IProduct | null;
}

export const ModalEditProduct: React.FC<IModel> = ({
  title,
  visible,
  product,
  handleCancel,
}) => {
  return (
    <Modal title={title} onCancel={handleCancel} footer={null} open={visible}>
      {product && (
        <div className="modal">
          <AddProductForm product={product} />
        </div>
      )}
    </Modal>
  );
};
