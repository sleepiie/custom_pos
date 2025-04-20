import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Breadcrumb, Layout, Menu, theme, Space } from "antd";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

import Stock from "./pages/Stock";
import Type from "./pages/Type";
import Sell from "./pages/Sell";
import Analysis from "./pages/Analysis";
import LoginPage from "./pages/Login";

import { ResizeWindow, GetCurrentUser } from "../wailsjs/go/main/App";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (loggedIn) {
      GetCurrentUser()
        .then((name) => setUsername(name))
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const dropdown_items: MenuItem[] = [
    getItem(
      <NavLink to="/#">ออกจากระบบ</NavLink>,
      "logout",
      <LogoutOutlined />,
    ),
  ];

  const items: MenuItem[] = [
    getItem(<NavLink to="/sell">ขาย</NavLink>, "1", <PieChartOutlined />),
    getItem(<NavLink to="/buy">ซื้อ</NavLink>, "2", <DesktopOutlined />),
    getItem("การรับฝาก", "sub1", <UserOutlined />, [
      getItem(<NavLink to="/get">รับฝาก</NavLink>, "3"),
      getItem(<NavLink to="/take">นำเครื่องออก</NavLink>, "4"),
    ]),
    getItem("จัดการสินค้า", "sub2", <UserOutlined />, [
      getItem(<NavLink to="/stock">สินค้า</NavLink>, "5"),
      getItem(<NavLink to="/category">หมวดหมู่</NavLink>, "6"),
    ]),
    getItem(
      <NavLink to="/analysis">จัดการหลังบ้าน</NavLink>,
      "7",
      <FileOutlined />,
    ),
  ];

  const handleLogin = () => {
    setLoggedIn(true);
    ResizeWindow(1024, 768); // ขยายหน้าต่างหลัง login
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            POS
          </div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items: dropdown_items,
                }}
                trigger={["click"]}
                arrow
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ color: "white", marginRight: "8px" }}>
                        {username}
                      </span>
                      <UserOutlined
                        style={{
                          color: "white",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </Space>
          </Space>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
              marginTop: 50,
              height: "100%",
              position: "fixed",
              left: 0,
            }}
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout
            style={{
              marginLeft: collapsed ? 80 : 200,
              marginTop: 50,
              transition: "all 0.2s",
            }}
          >
            <Content style={{ margin: "10px 10px" }}>
              <div
                style={{
                  padding: 24,
                  minHeight: "100%",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Routes>
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/stock" element={<Stock />} />
                  <Route path="/category" element={<Type />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/" element={<Sell />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default App;
