import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
} from '@ant-design/icons';

function Sidebar() {
    return (
        <Menu theme="dark" mode="inline" style={{ marginTop: '20px' }}>
            <Menu.Item icon={<UserOutlined />}>Profile</Menu.Item>
            <Menu.Item icon={<AreaChartOutlined />}>Member Summary</Menu.Item>
            <Menu.SubMenu icon={<BookOutlined />} title="Chapter">
                <Menu.Item>(eg. Leeds)</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}

export default Sidebar;
