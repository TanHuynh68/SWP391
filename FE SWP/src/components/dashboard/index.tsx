import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, MenuProps, message, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import "./dashboard.css";
import { paths } from '@/constants';

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
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/admin')) {
            setItems([
                getItem('Dashboard', '/admin/dashboard', <DesktopOutlined />),
                getItem('Manage User', '/admin/manage-user', <UserOutlined />),
                getItem('Manage Clinic', '/admin/manage-clinic', <DesktopOutlined />),
                getItem('Manage Clinic Owners', '/admin/manage-clinic-owner', <UserOutlined />),
            ]);
        }else if(currentPath.startsWith('/clinic-owner')) {
            setItems([
                getItem('Register Clinic', '/clinic-owner/register-clinic', <DesktopOutlined />),
                getItem('Register Doctor', '/clinic-owner/manage-doctor', <UserOutlined />),
                getItem('Manage Patient', '/clinic-owner/manage-patient', <UserOutlined />),
                getItem('Quản lý lịch khám bệnh', '/clinic-owner/manage-medical-examination-schedule', <UserOutlined />),
                // getItem('Manage Clinic', '/admin/manage-clinic', <DesktopOutlined />),
                
                // getItem('Manage Clinic Owners', '/admin/manage-clinic-owner', <UserOutlined />),
            ]);
        }
    };

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user"); 
        navigate(paths.HOME)
        message.success("Logout Successfully")
    }
    const menuItems = [
        {
            key: '1',
            label: (
                <p rel="noopener noreferrer">
                   Profile
                </p>
            ),
        },
        {
            key: '2',
            label: (
                <p onClick={handleLogout} rel="noopener noreferrer" >
                   Log out
                </p>
            ),
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
                    // className='w-96 pr-10'
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
                        className="dropdown-center float-right" // Add custom class
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
                    ©2024 FPTeeth
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
