import {
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioChangeEvent,
  Button,
} from "antd";
import { v4 } from "uuid";
import React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../store";
import { addUser } from "../../slices/usersList";

const { Option } = Select;

interface FormValues {
  name: string;
  role: string[];
  username: string;
  password: string;
  discount?: string;
  tables?: number[];
  workingHours?: string;
  workingDays?: string[];
}

const roleOptions = [
  { label: "Bartender", value: "bartender" },
  { label: "Customer", value: "customer" },
  { label: "Waiter", value: "waiter" },
  { label: "Admin", value: "admin" },
  { label: "Сook", value: "cook" },
];

interface User {
  role: string;
  table: number;
}

const tableOptions = [
  { value: 1, label: "Table 1" },
  { value: 2, label: "Table 2" },
  { value: 3, label: "Table 3" },
  { value: 4, label: "Table 4" },
  { value: 5, label: "Table 5" },
  { value: 6, label: "Table 6" },
  { value: 7, label: "Table 7" },
];

const users: User[] = [
  { role: "waiter", table: 1 },
  { role: "waiter", table: 3 },
  { role: "waiter", table: 5 },
];

const filteredOptions = tableOptions.filter((option) => {
  // Проверяем, выбрана ли опция каким-либо пользователем-официантом
  const isSelected = users.some(
    (user) => user.role === "waiter" && user.table === option.value
  );
  // возвращаем опцию только, если она не выбрана
  return !isSelected;
});

const UserForm = () => {
  const [selectedRole, setSelectedRole] = useState<string>();
  const [form] = Form.useForm<FormValues>();

  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    dispatch(addUser({ ...values, id: v4() }));
    form.resetFields();
  };

  const selRole = (str: string): boolean =>
    ["cook", "bartender", "waiter", "admin"].includes(str);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="username"
        label="Login"
        rules={[
          { required: true, message: "Введите Login" },
          {
            min: 4,
            message: " не менее 4 символов",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Введите пароль" },
          {
            min: 6,
            message: "не менее 6 символов",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Radio.Group
          options={roleOptions}
          onChange={(e: RadioChangeEvent) => {
            form.setFieldsValue({
              //   discount: null,
              //   tables: null,
              //   workingDays: null,
              //   workingHours: null,
            });
            setSelectedRole(e.target.value);
          }}
        />
      </Form.Item>

      {selectedRole === "customer" && (
        <Form.Item
          name="discount"
          label="Discount"
          rules={[{ required: true }]}
          style={{ minWidth: "200px" }}
        >
          <Select>
            <Option value="10%">10%</Option>
            <Option value="25%">25%</Option>
            <Option value="50%">50%</Option>
          </Select>
        </Form.Item>
      )}

      {selectedRole && selRole(selectedRole) && (
        <>
          {selectedRole === "waiter" && (
            <Form.Item
              name="tables"
              label="Tables"
              rules={[{ required: true }]}
              style={{ minWidth: "200px" }}
            >
              <Select mode="multiple" options={filteredOptions} />
            </Form.Item>
          )}
          <Form.Item
            rules={[{ required: true }]}
            name="workingDays"
            label="Working Days"
          >
            <Checkbox.Group>
              <Checkbox value={"monday"}>Monday</Checkbox>
              <Checkbox value={"tuesday"}>Tuesday</Checkbox>
              <Checkbox value={"wednesday"}>Wednesday</Checkbox>
              <Checkbox value={"thursday"}>Thursday</Checkbox>
              <Checkbox value={"friday"}>Friday</Checkbox>
              <Checkbox value={"saturday"}>Saturday</Checkbox>
              <Checkbox value={"sunday"}>Sunday</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            rules={[{ required: true }]}
            style={{ minWidth: "200px" }}
            name="workingHours"
            label="Working Hours"
          >
            <Select>
              <Option value="morning">Morning (9am - 12pm)</Option>
              <Option value="afternoon">Afternoon (12pm - 3pm)</Option>
              <Option value="evening">Evening (3pm - 6pm)</Option>
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
};
export default UserForm;
