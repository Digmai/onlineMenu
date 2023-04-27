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
      <div className="model"></div>
    </Modal>
  );
};
