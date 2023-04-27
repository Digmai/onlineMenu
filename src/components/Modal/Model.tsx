import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";

interface IModel {
  handleCancel: () => void;
  visible: boolean;
}

export const Model: React.FC<IModel> = ({ handleCancel, visible }) => {
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
          <div className="modal__detail-name">Пица c "Домашняя"</div>
          <div>Пица c "Домашняя"</div>
        </div>

        <div className="modal__buttom">
          <button className="modal__buttom-page">
            <div className="modal__button-text">Довоавить</div>
          </button>
        </div>
      </div>
    </Modal>
  );
};
