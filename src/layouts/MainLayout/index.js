import React from 'react';

import { Outlet } from 'react-router';
import { Row, Col, Layout, Grid } from 'antd';

import SummaryTable from './SummaryTable';

function MainLayout() {
    const screens = Grid.useBreakpoint();
    return (
        <Layout
            style={{
                background:
                    'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(0,212,240,1) 20%, rgba(4,0,255,1) 100%',
                minHeight: '100vh',
            }}
        >
            <Row justify="space-around" align="top">
                <Col flex="auto">
                    <SummaryTable />
                </Col>
                {screens.lg && (
                    <Col span={10}>
                        <Outlet />
                    </Col>
                )}
            </Row>
            <Row justify="center">
                {!screens.lg && (
                    <Col flex="auto">
                        <Outlet />
                    </Col>
                )}
            </Row>
        </Layout>
    );
}

export default MainLayout;
