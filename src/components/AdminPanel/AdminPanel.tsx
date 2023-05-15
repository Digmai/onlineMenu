import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider } from "antd";
import { Layout, Menu } from "antd";
import UserForm from "../User/UserForm";
import AddTables from "../Tables/AddTables";
import { AddProductForm } from "../Product/AddProduct";
import { IProduct } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductsListAdminPage from "../Product/ProductsListAdminPage";

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

export const AdminPanel: React.FC = () => {
  const { Header, Content, Footer, Sider } = Layout;
  const [currentMenuItem, setCurrentMenuItem] = useState("1");
  const [tableList, setTableList] = useState<UserType[]>([]);
  const [productList, setProductList] = useState<IProduct[]>([]);

  const productSelect = useSelector(
    (state: RootState) => state.product.product
  );

  const handleMenuItemClick = (key: string) => {
    setCurrentMenuItem(key);
  };

  let selectedComponent: React.ReactNode = null;

  if (currentMenuItem === "1") {
    selectedComponent = <UserForm />;
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
        <AddTables
          onAdd={() => []}
          tables={[
            { id: "1", name: "Table 1" },
            {
              id: "2",
              name: "Table 2",
            },
          ]}
          users={tableList}
        />
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
        <AddProductForm onAdd={() => []} />
        <ProductsListAdminPage />
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
          <Header style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 24, textAlign: "center" }}>
              {selectedComponent}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
