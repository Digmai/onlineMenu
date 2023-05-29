import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { useSelector } from "react-redux";
import { deleteUser, getCurrentUser } from "../../slices/users";
import { RootState, useAppDispatch } from "../../store";
import ModalEditUser from "./ModalEditUser";
import { IUser } from "../../types";

const { Column } = Table;

const UserList = () => {
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.usersList.currentUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleCancel = () => {
    setSelectedUser(null);
    setPreviewVisible(false);
  };

  const handleCancelDelete = (_id: string) => {
    dispatch(deleteUser(_id));
  };

  if (!users) return <div>no users!</div>;
  return (
    <>
      {selectedUser && (
        <ModalEditUser
          visible={previewVisible}
          toggle={handleCancel}
          user={selectedUser}
        />
      )}
      <Table dataSource={users}>
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Login" dataIndex="username" key="username" />
        <Column
          title="Роль"
          dataIndex="role"
          key="role"
          render={(role: string) => (
            <span key={role}>{role.toUpperCase()}</span>
          )}
        />
        <Column
          title="Действия"
          key="actions"
          render={(text: string, record: IUser) => (
            <Space size="middle">
              <Button
                onClick={() => {
                  setSelectedUser(record);
                  setPreviewVisible(true);
                }}
                key={`edit-${record._id}`}
              >
                Изменить
              </Button>
              <Button
                onClick={() => handleCancelDelete(record._id)}
                key={`delete-${record._id}`}
                type="primary"
                danger
              >
                Удалить
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default UserList;
