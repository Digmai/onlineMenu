import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { IProduct} from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface IModel {
  handleCancel: () => void;
  visible: boolean;
  product: IProduct;
}

export const Model: React.FC<IModel> = ({ handleCancel, visible, product }) => {
  return (
    <Modal
      title="блюдо"
      onCancel={handleCancel}
      footer={null}
      visible={visible}
    >
      <div className="modal">
        <img src="f.jfif" alt="" className="modal__imege"></img>
        <div className="modal__img-circle " />

        <div className="modal__detail">
          <div className="modal__detail-name">{product.name}</div>
          {product.ingredients.map((e) => (
            <div className="modal__detail-ingredients">
              <div className="modal__detail-ingredients-name">{e.name}</div>
              <div className="modal__detail-ingredients-weight">
                {e.weight} г.
              </div>
            </div>
          ))}
          <div className="modal__detail-time">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            Cooking Time: {product.CookingTime} min
          </div>
        </div>

        <div className="modal__buttom">
          <button className="modal__buttom-page">
            <div className="modal__button-text">Добавить</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
