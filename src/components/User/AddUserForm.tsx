import React, { useState } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { addUser } from "../../slices/user";
import { IUser } from "../../types";
import { useAppDispatch } from "../../store";
import { v4 } from "uuid";

const { Option } = Select;

interface Props {
  roles?: string[];
}

const AddUserForm: React.FC<Props> = ({
  roles = ["customer", "cook", "bartender", "waiter", "admin"],
}) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: IUser) => {
    const newUser: IUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
      _id: v4(),
    };
    dispatch(addUser(newUser));
    setVisible(false);
    form.resetFields();
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить пользователя
      </Button>
      <Modal
        visible={visible}
        title="Добавить нового пользователя"
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="add-user-form" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Введите email" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Введите пароль" },
              {
                min: 6,
                message: "Пароль должен содержать не менее 6 символов",
              },
            ]}
          >
            <Input placeholder="Пароль" type="password" />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: "Выберите роль" }]}
          >
            <Select placeholder="Роль">
              {roles.map((role) => (
                <Option key={role} value={role}>
                  {role}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddUserForm;
