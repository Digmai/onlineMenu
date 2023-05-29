import { Modal, Form, Input, Radio, Checkbox, Select } from "antd";
import { FormUserValues, IUser } from "../../types";
import { useAppDispatch } from "../../store";
import { updateUser } from "../../slices/users";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  selectTablesWhereBartenderIsNull,
  selectTablesWhereWaiterIsNull,
} from "../../slices/table";

const { Option } = Select;

interface ModalEditUserProps {
  user: IUser;
  visible: boolean;
  toggle: () => void;
}

const ModalEditUser = React.memo(
  ({ user, visible, toggle }: ModalEditUserProps) => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm<FormUserValues>();

    const waiterOptions = useSelector(selectTablesWhereWaiterIsNull());
    const bartenderOptions = useSelector(selectTablesWhereBartenderIsNull());

    const selRole = useMemo(() => {
      return (str: string): boolean =>
        ["cook", "bartender", "waiter", "admin"].includes(str);
    }, []);

    const handleOk = useMemo(() => {
      return () => {
        form
          .validateFields()
          .then((values) => {
            dispatch(updateUser({ id: user._id, user: values }));
            toggle();
            form.resetFields();
          })
          .catch((info) => console.log("Validate Failed:", info));
      };
    }, [dispatch, form, toggle, user._id]);

    const handleCancel = useMemo(() => {
      return () => {
        toggle();
        form.resetFields();
      };
    }, [form, toggle]);

    return (
      <Modal
        title="Edit User"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {user && (
          <Form
            form={form}
            layout="vertical"
            initialValues={user}
            onFinish={(values) => console.log(values)}
          >
            <Form.Item name="name" label="Name" rules={[]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Login"
              rules={[
                { message: "Введите Login" },
                {
                  min: 4,
                  message: " не менее 4 символов",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {user.role !== "customer" && (
              <Form.Item
                name="password"
                label="New Password"
                rules={[
                  {
                    min: 6,
                    message: "Password must be at least 6 characters",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}

            {user.role === "customer" && (
              <Form.Item name="discount" label="Discount" rules={[]}>
                <Select>
                  <Option value="10%">10%</Option>
                  <Option value="25%">25%</Option>
                  <Option value="50%">50%</Option>
                </Select>
              </Form.Item>
            )}

            {user.role && selRole(user.role) && (
              <>
                {user.role === "waiter" && (
                  <Form.Item
                    name="tables"
                    label="Tables"
                    rules={[]}
                    style={{ minWidth: "200px" }}
                  >
                    <Select mode="multiple" options={waiterOptions} />
                  </Form.Item>
                )}
                {user.role === "bartender" && (
                  <Form.Item
                    name="tables"
                    label="Tables"
                    rules={[]}
                    style={{ minWidth: "200px" }}
                  >
                    <Select mode="multiple" options={bartenderOptions} />
                  </Form.Item>
                )}

                <Form.Item name="workingDays" label="Working Days" rules={[]}>
                  <Checkbox.Group>
                    <Checkbox value="Monday">Monday</Checkbox>
                    <Checkbox value="Tuesday">Tuesday</Checkbox>
                    <Checkbox value="Wednesday">Wednesday</Checkbox>
                    <Checkbox value="Thursday">Thursday</Checkbox>
                    <Checkbox value="Friday">Friday</Checkbox>
                    <Checkbox value="Saturday">Saturday</Checkbox>
                    <Checkbox value="Sunday">Sunday</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </>
            )}
          </Form>
        )}
      </Modal>
    );
  }
);

export default ModalEditUser;
