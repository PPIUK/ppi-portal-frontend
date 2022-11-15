import React from 'react';
import { Card, Grid, Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';

const { Content } = Layout;

const { useBreakpoint } = Grid;

export default function PublicLayout() {
    const screens = useBreakpoint();

    return (
        <Layout
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(0,212,240,1) 20%, rgba(4,0,255,1) 100%',
                minHeight: !screens.xs ? '100vh' : 0,
            }}
        >
            <Content
                style={{
                    margin: !screens.xs ? '24px 48px' : 0,
                    marginTop: 24,
                    padding: !screens.xs ? 30 : 0,
                    minHeight: !screens.xs ? '100vh' : 0,
                    overflow: 'initial',
                }}
            >
                <Card>
                    <Space style={{ width: '100%', justifyContent: 'center' }}>
                        <Link to={'/'}>
                            <img
                                width={100}
                                src="https://ppiuk.org/wp-content/uploads/2017/05/ppiuk.jpg"
                            />
                        </Link>
                        <Typography.Title
                            level={2}
                            style={{ textAlign: 'center' }}
                        >
                            PPI UK Thesis Bank
                        </Typography.Title>
                    </Space>
                    <Outlet />
                </Card>
            </Content>
        </Layout>
    );
}
