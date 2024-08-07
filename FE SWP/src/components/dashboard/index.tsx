import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const navigate = useNavigate(); // Hook to navigate programmatically

    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setItems([
            getItem('Manage User', '/admin/manage-user', <UserOutlined />),
            getItem('Manage Clinic ', '/admin/manage-clinic', <DesktopOutlined />),
            getItem('Manage Clinic Owners', '/admin/manage-clinic-owner', <UserOutlined />),
            // getItem('Manage Clinic Owners', '/admin/manage-clinic-owner', <UserOutlined />, [
            //     getItem('Tom', '3'),
            //     getItem('Bill', '4'),
            //     getItem('Alex', '5'),
            // ]),
            getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
            getItem('Files', '9', <FileOutlined />),
        ]);
    }

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { Header, Content, Footer, Sider } = Layout;
    
    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu 
                    theme="dark" 
                    mode="inline" 
                    defaultSelectedKeys={['4']} 
                    items={items} 
                    onClick={handleClick} // Add onClick handler
                />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header className="bg-white" style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
