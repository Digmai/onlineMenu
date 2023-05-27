import React, { lazy, useState, Suspense } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider } from "antd";
import UserForm from "../User/UserForm";
import { logout } from "../../slices/user";
import { Button, Layout, Menu } from "antd";
import { useAppDispatch } from "../../store";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UserList from "../User/UserList";

type UserType = {
  id: string;
  name: string;
  role: string;
  table: number;
};

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "User Form",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Add Tables",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Add Product",
  },
];

const AddTables = lazy(() => import("../Tables/AddTables"));
const ProductsTree = lazy(() => import("../Product/ProductsTree"));
const AddProductForm = lazy(() => import("../Product/AddProductForm"));

export const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Header, Content, Footer, Sider } = Layout;
  const [currentMenuItem, setCurrentMenuItem] = useState("1");

  const handleMenuItemClick = (key: string) => {
    setCurrentMenuItem(key);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  let selectedComponent: React.ReactNode = null;

  if (currentMenuItem === "1") {
    selectedComponent = (
      <>
        <Suspense fallback={<LoadingSpinner />}>
          <UserForm />
          <UserList />
        </Suspense>
      </>
    );
  } else if (currentMenuItem === "2") {
    selectedComponent = (
      <div>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
        <Suspense fallback={<LoadingSpinner />}>
          <AddTables />
        </Suspense>
      </div>
    );
  } else if (currentMenuItem === "3") {
    selectedComponent = (
      <div>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        ></div>
        <Suspense fallback={<LoadingSpinner />}>
          <AddProductForm />
          <ProductsTree />
        </Suspense>
      </div>
    );
  }

  return (
    <ConfigProvider>
      <Layout hasSider>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          ></div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={(event) => handleMenuItemClick(event.key)}
          />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0 }}>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                style={{
                  color: "white",
                }}
                type="text"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
              minHeight: "100vh",
            }}
          >
            <div style={{ padding: 24, textAlign: "center" }}>
              {selectedComponent}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design ©2023 Created by Project
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
