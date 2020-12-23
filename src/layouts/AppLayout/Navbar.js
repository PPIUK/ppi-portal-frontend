import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../utils/useAuth';

function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        auth.signout().then(() => {
            navigate('/login');
        });
    };

    return (
        <Menu style={{ float: 'right' }} mode="horizontal">
            <Menu.SubMenu
                key="SubMenu"
                icon={<MenuOutlined />}
                title={auth.user.fullName}
            >
                <Menu.Item key="/logout" icon={<UserOutlined />}>
                    My Profile<Link to="/app/profile/me"></Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    key="/logout"
                    icon={<LogoutOutlined />}
                    danger={true}
                    onClick={onLogout}
                >
                    Logout
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}

export default Navbar;
