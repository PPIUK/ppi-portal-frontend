import React, { useState } from 'react';

import { Navigate, Outlet } from 'react-router';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';

const { Header, Sider, Footer, Content } = Layout;

import { useAuth } from '../../utils/useAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './index.css';

function AppLayout() {
    const auth = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = (val) => setCollapsed(val);

    if (!auth.user) return <Navigate to="/login" />;
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
                <Sidebar />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
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
                        marginTop: 64,
                        padding: 24,
                        minHeight: '100vh',
                        overflow: 'initial',
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
    );
}

export default AppLayout;
