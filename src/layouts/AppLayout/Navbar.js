import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

function Navbar() {
    return (
        <Menu style={{ float: 'right' }} mode="horizontal">
            <Menu.Item key="/logout" danger={true}>
                Logout<Link to="/"></Link>
            </Menu.Item>
        </Menu>
    );
}

export default Navbar;
