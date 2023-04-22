import React, { useEffect } from "react";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../slices/users";
import { RootState, useAppDispatch } from "../../store";

const { Column } = Table;

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.currentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!users) return <div>no users!</div>;
  return (
    <Table dataSource={users}>
      <Column title="Имя" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Роль"
        dataIndex="role"
        key="role"
        render={(role: string) => <span>{role.toUpperCase()}</span>}
      />
      <Column
        title="Действия"
        key="actions"
        render={(text: string, record: any) => (
          <Space size="middle">
            <Button>Изменить</Button>
            <Button type="primary" danger>
              Удалить
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserList;
