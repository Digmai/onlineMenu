import { Form, Input, Select, Checkbox, Radio, RadioChangeEvent } from "antd";
import { useState } from "react";

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

  const onFinish = (values: any) => {
    console.log(values);
  };

  const selRole = (str: string): boolean =>
    ["cook", "bartender", "waiter", "admin"].includes(str);
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="username" label="Username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
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
        <Form.Item name="discount" label="Discount">
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
            <Form.Item name="tables" label="Tables">
              <Select mode="multiple" options={filteredOptions} />
            </Form.Item>
          )}
          <Form.Item name="workingDays" label="Working Days">
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

          <Form.Item name="workingHours" label="Working Hours">
            <Select>
              <Option value="morning">Morning (9am - 12pm)</Option>
              <Option value="afternoon">Afternoon (12pm - 3pm)</Option>
              <Option value="evening">Evening (3pm - 6pm)</Option>
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item>
        <button type="submit">Submit</button>
      </Form.Item>
    </Form>
  );
};
export default UserForm;