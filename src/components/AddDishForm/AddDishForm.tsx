import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Modal } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { IProduct } from "../../types";
import { useAppDispatch } from "../../store";

interface Props {
  isDishForm: boolean;
}

const AddDishOrDrinkForm: React.FC<Props> = ({ isDishForm }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: { name: any; price: any }) => {
    if (isDishForm) {
      const newDish: IProduct = {
        name: values.name,
        price: values.price,
        _id: "",
        ingredients: [],
        image: "",
        CookingTime: 5,
        category: "Re[zy",
        DishOrDrink: "Dish",
        subcategory: "}{ILE6",
        totalWeight: 220,
      };
      dispatch(addDish(newDish));
    } else {
      const newDrink: IProduct = {
        name: values.name,
        price: values.price,
        _id: "",
        ingredients: [],
        image: "",
        CookingTime: 5,
        category: "Re[zy",
        DishOrDrink: "Drink",
        subcategory: "}{ILE6",
        totalWeight: 220,
      };
      dispatch(addDrink(newDrink));
    }
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
      <ButtonWrapper type="primary" onClick={showModal}>
        <FaPlusCircle size={20} />{" "}
        {isDishForm ? "Новое блюдо" : "Новый напиток"}
      </ButtonWrapper>
      <Modal
        visible={visible}
        title={isDishForm ? "Добавить новое блюдо" : "Добавить новый напиток"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="add-dish-or-drink-form" onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Введите название" }]}
          >
            <InputWrapper placeholder="Название" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Введите цену" }]}
          >
            <InputWrapper type="number" placeholder="Цена" />
          </Form.Item>
          <ButtonWrapper type="primary" htmlType="submit" block>
            Добавить
          </ButtonWrapper>
        </Form>
      </Modal>
    </>
  );
};

const ButtonWrapper = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
  margin-top: 10px;
`;

const InputWrapper = styled(Input)`
  width: 100%;
`;

export default AddDishOrDrinkForm;
function addDish(newDish: IProduct): any {
  throw new Error("Function not implemented.");
}

function addDrink(newDrink: IProduct): any {
  throw new Error("Function not implemented.");
}
