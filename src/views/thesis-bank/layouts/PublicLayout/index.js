import React from 'react';
import { Card, Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router';

const { Content } = Layout;

export default function PublicLayout() {
    return (
        <Layout
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(0,212,240,1) 20%, rgba(4,0,255,1) 100%',
                minHeight: '100vh',
            }}
        >
            <Content
                style={{
                    margin: '24px 48px',
                    marginTop: 24,
                    padding: 30,
                    minHeight: '100vh',
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
