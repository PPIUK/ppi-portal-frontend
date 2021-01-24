import React from 'react';
import { Menu } from 'antd';
import {
    UserOutlined,
    AreaChartOutlined,
    BookOutlined,
    FormOutlined,
    UnorderedListOutlined,
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
            {auth.user.roles.includes('verified') && (
                <Menu.Item
                    icon={<AreaChartOutlined />}
                    key="/app/member-database/search"
                >
                    <Link to="/app/member-database/search" />
                    Member Summary
                </Menu.Item>
            )}
            {auth.user.roles.includes('dataAccess') && (
                <Menu.SubMenu
                    icon={<BookOutlined />}
                    title={`Chapter: ${auth.user.branch}`}
                >
                    <Menu.Item
                        key={`/app/member-database/branch/${auth.user.branch}`}
                    >
                        <Link
                            to={`/app/member-database/branch/${auth.user.branch}`}
                        />
                        Member List
                    </Menu.Item>
                    <Menu.Item hidden>Pending Verification</Menu.Item>
                </Menu.SubMenu>
            )}
            <Menu.Item icon={<FormOutlined />} key="/app/mvp-award/">
                <Link to="/app/mvp-award/" />
                MVP Awards
            </Menu.Item>
            {auth.user.roles.includes('mvpAwardsAccess') && (
                <Menu.Item
                    icon={<UnorderedListOutlined />}
                    key="/app/mvp-award/submissions"
                >
                    <Link to="/app/mvp-award/submissions" />
                    MVP Submissions
                </Menu.Item>
            )}
        </Menu>
    );
}

export default Sidebar;
