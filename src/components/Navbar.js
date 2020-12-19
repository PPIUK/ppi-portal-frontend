import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu } from 'antd';

function Navbar() {
    let location = useLocation();

    return (
    <>
        <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
            <img 
              alt="PPI UK Logo" 
              src="https://www.medanbagus.com/assets/images/news/2018/38644_01262028022013_ppiuk-logo-wide.jpg"
              style={{width:'9.2rem', height:'3.5rem'}}
            />
            </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[ location.pathname ]}>
            <Menu.Item key="/">Home<Link to="/"></Link></Menu.Item>
            <Menu.Item key="/login">Login<Link to="/login"></Link></Menu.Item>
            <Menu.Item key="/register">Register<Link to="/register"></Link></Menu.Item>
            <Menu.Item key="/logout">Logout<Link to="/"></Link></Menu.Item>
        </Menu>
        </div>
    </>
    )
}

export default Navbar;