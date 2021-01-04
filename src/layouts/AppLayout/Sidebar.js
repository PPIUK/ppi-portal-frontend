import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
    FormOutlined,
} from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const auth = useAuth();
    const location = useLocation();

    return (
        <Menu
            theme="dark"
            mode="inline"
            style={{ marginTop: '20px' }}
            selectedKeys={[location.pathname]}
        >
            <Menu.Item icon={<UserOutlined />} key="/app/profile/me">
                <Link to="/app/profile/me" />
                My Profile
            </Menu.Item>
            <Menu.Item hidden icon={<AreaChartOutlined />}>
                Member Summary
            </Menu.Item>
            <Menu.SubMenu
                icon={<BookOutlined />}
                title={`Chapter: ${auth.user.branch}`}
                hidden
            >
                <Menu.Item>
                    <Link to="#" />
                    Member List
                </Menu.Item>
                <Menu.Item>Pending Verification</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<FormOutlined />} key="/app/mvp-award/">
                <Link to="/app/mvp-award/" />
                MVP Awards
            </Menu.Item>
        </Menu>
    );
}

export default Sidebar;
