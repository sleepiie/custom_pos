import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';


import Buy from './pages/Buy';
import Sell from './pages/Sell';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

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

  const items: MenuItem[] = [
    getItem(<NavLink to="/option1">Option 1</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink to="/option2">Option 2</NavLink>, '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem(<NavLink to="/user/tom">Tom</NavLink>, '3'),
      getItem(<NavLink to="/user/bill">Bill</NavLink>, '4'),
      getItem(<NavLink to="/user/alex">Alex</NavLink>, '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem(<NavLink to="/team/1">Team 1</NavLink>, '6'),
      getItem(<NavLink to="/team/2">Team 2</NavLink>, '8'),
    ]),
    getItem(<NavLink to="/files">Files</NavLink>, '9', <FileOutlined />),
  ];

  return (
    <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Content style={{ margin: '16px 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/option1" element={<Buy />} />
                <Route path="/option2" element={<Sell />} />
                <Route path="/" element={<div>Home Page</div>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default App;