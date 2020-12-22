import React, { useState } from 'react';

import { Outlet } from 'react-router';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
    CopyrightOutlined,
} from '@ant-design/icons';

const { Header, Sider, Footer, Content } = Layout;
const { SubMenu } = Menu;

import Navbar from './Navbar';
import './index.css';

function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (val) => setCollapsed(val);
    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 2,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" style={{ marginTop: '20px' }}>
                    <Menu.Item icon={<UserOutlined />}>Profile</Menu.Item>
                    <Menu.Item icon={<AreaChartOutlined />}>All Data</Menu.Item>
                    <SubMenu icon={<BookOutlined />} title="Chapter">
                        <Menu.Item>(eg. Leeds)</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout>
                <Layout>
                    <Header
                        style={{
                            backgroundColor: '#fff',
                            position: 'fixed',
                            left: 0,
                            right: 0,
                            top: 0,
                            width: '100%',
                            zIndex: 1,
                        }}
                    >
                        <Navbar />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Outlet />
                    </Content>
                    <Footer
                        style={{ textAlign: 'center', backgroundColor: '#fff' }}
                    >
                        <CopyrightOutlined /> PPI UK 2020
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default AppLayout;
