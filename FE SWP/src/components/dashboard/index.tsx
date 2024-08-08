import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    SmileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, MenuProps, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import "./dashboard.css";

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
            getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
            getItem('Files', '9', <FileOutlined />),
        ]);
    };

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    const menuItems = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];

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
                <Header className="bg-white">
                    <Dropdown
                        overlay={<Menu items={menuItems} />}
                        trigger={['click']}
                        className="dropdown-center" // Add custom class
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
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
