import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
} from '@ant-design/icons';

import { useAuth } from '../../utils/useAuth';
import { Link } from 'react-router-dom';

function Sidebar() {
    const auth = useAuth();

    return (
        <Menu theme="dark" mode="inline" style={{ marginTop: '20px' }}>
            <Menu.Item icon={<UserOutlined />}>My Profile</Menu.Item>
            <Menu.Item icon={<AreaChartOutlined />}>Member Summary</Menu.Item>
            <Menu.SubMenu
                icon={<BookOutlined />}
                title={`Chapter: ${auth.user.branch}`}
            >
                <Menu.Item>
                    <Link to="myass" />
                    Member List
                </Menu.Item>
                <Menu.Item>Pending Verification</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}

export default Sidebar;
