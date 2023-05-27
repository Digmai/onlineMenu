import React, { useEffect } from "react";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../slices/usersList";
import { RootState, useAppDispatch } from "../../store";

const { Column } = Table;

const UserList = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.usersList.currentUser);
  console.log(users);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  if (!users) return <div>no users!</div>;
  return (
    <Table dataSource={users}>
      <Column title="Имя" dataIndex="name" key="name" />
      <Column title="Login" dataIndex="username" key="username" />
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
