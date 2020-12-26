import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
    FormOutlined,
} from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';
import { Link } from 'react-router-dom';

function Sidebar() {
    const auth = useAuth();

    return (
        <Menu theme="dark" mode="inline" style={{ marginTop: '20px' }}>
            <Menu.Item icon={<UserOutlined />}>
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
            <Menu.Item icon={<FormOutlined />}>
                <Link to="/app/mvp-award/" />
                MVP Awards
            </Menu.Item>
        </Menu>
    );
}

export default Sidebar;
