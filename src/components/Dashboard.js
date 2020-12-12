import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  AreaChartOutlined,
  BookOutlined,
  CopyrightOutlined
} from '@ant-design/icons';
import DataTable from './DataTable';

const { Sider, Footer, Content } = Layout;
const { SubMenu } = Menu;

class HomeDashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} >
          <Menu theme="dark" mode="inline" style={{marginTop: '20px'}}>
            <Menu.Item icon={<UserOutlined />}>Profile</Menu.Item>
            <Menu.Item icon={<AreaChartOutlined />}>All Data</Menu.Item>
            <SubMenu icon={<BookOutlined />} title="Chapter">
              <Menu.Item>(eg. Leeds)</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{background: 'grey'}}>
          <Content style={{ margin: '20px 16px' }}>
            <DataTable/>
          </Content>
          <Footer style={{ textAlign: 'center' }}><CopyrightOutlined /> PPI UK 2020 </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default HomeDashboard;