import {
  Form,
  Input,
  Select,
  Checkbox,
  Radio,
  RadioChangeEvent,
  Button,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { addUser } from "../../slices/users";
import { useSelector } from "react-redux";
import {
  getTables,
  selectTablesByStatus,
  selectTablesWhereBartenderIsNull,
  selectTablesWhereWaiterIsNull,
} from "../../slices/table";
import { FormUserValues, IProduct } from "../../types";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { selectAllProduct } from "../../slices/product";

const { Option } = Select;

const roleOptions = [
  { label: "Bartender", value: "bartender" },
  { label: "Customer", value: "customer" },
  { label: "Waiter", value: "waiter" },
  { label: "Admin", value: "admin" },
  { label: "Сook", value: "cook" },
];

const UserForm = () => {
  const dispatch = useAppDispatch();

  const [selectedRole, setSelectedRole] = useState<string>();
  const [subcategories, setSubcategories] = useState<
    IProduct[] | { [subcategory: string]: IProduct[] }
  >([]);

  const [form] = Form.useForm<FormUserValues>();

  const waiterOptions = useSelector(selectTablesWhereWaiterIsNull());
  const bartenderOptions = useSelector(selectTablesWhereBartenderIsNull());

  console.log(waiterOptions, bartenderOptions);

  const products = useSelector(selectAllProduct);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  const onFinish = (values: any) => {
    dispatch(addUser(values));
    // !!! после отправки формы внутри среза даынные столов
    // !!!  -  НЕ РАБОТАЕТ ОН И ДАЖЕ ТАК !!! исправить! -->
    //                          (список не актуализируеться после отправки формы)
    //                                      : обновляють из сервера внутри среза!
    setSelectedRole("");
    form.resetFields();
  };

  if (!products) return <LoadingSpinner />;

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
            form.setFieldsValue({});
            setSelectedRole(e.target.value);
          }}
        />
      </Form.Item>

      {selectedRole === "cook" && (
        <>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select a category" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue("responsibilityAll")) {
                    return Promise.resolve();
                  }
                  if (value !== undefined) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Please select a category"));
                },
              }),
            ]}
            style={{ minWidth: "200px" }}
          >
            <Select
              onChange={(value: string) => setSubcategories(products[value])}
            >
              <Option value="ALL">ALL</Option>
              {Object.keys(products).map((category) => (
                <Option value={category} key={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      )}

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
              <Select mode="multiple" options={waiterOptions} />
            </Form.Item>
          )}
          {selectedRole === "bartender" && (
            <Form.Item
              name="tables"
              label="Tables"
              rules={[{ required: true }]}
              style={{ minWidth: "200px" }}
            >
              <Select mode="multiple" options={bartenderOptions} />
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
