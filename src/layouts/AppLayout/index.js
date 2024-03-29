import React, { useState } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router';
import { Layout } from 'antd';
import { CopyrightOutlined } from '@ant-design/icons';

const { Header, Sider, Footer, Content } = Layout;

import { useAuth } from '../../utils/useAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './index.css';

function AppLayout() {
    const auth = useAuth();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const onCollapse = (val) => setCollapsed(val);

    if (!auth.user)
        return <Navigate to={`/login?redirect=${location.pathname}`} />;

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                onBreakpoint={(hit) =>
                    hit ? setShowToggle(true) : setShowToggle(false)
                }
                zeroWidthTriggerStyle={showToggle ? {} : { display: 'none' }}
                collapsedWidth="0"
                style={{
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    zIndex: 2,
                }}
            >
                <div className="logo" />
                <Sidebar />
            </Sider>
            <Layout
                style={{ marginLeft: collapsed ? 0 : showToggle ? 0 : 200 }}
            >
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
                        marginTop: 64,
                        padding: 24,
                        paddingLeft: collapsed ? 0 : showToggle ? 0 : 24,
                        paddingRight: collapsed ? 0 : showToggle ? 0 : 24,
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
