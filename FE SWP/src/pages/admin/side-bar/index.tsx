import React, { useState } from 'react';
import {
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
const {  Sider } = Layout;
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
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

interface SidebarDataType {
    icon: React.ElementType;
    heading: string;
    href: string;
    children?: SidebarDataType[];
}
const SideBar = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string>('');
    const [expanded] = useState<boolean>(true);
    const sideBar: SidebarDataType[] = [
        {
            icon: VideoCameraOutlined,
            heading: "Demo1",
            href: "/admin/demo1"
        },
        {
            icon: UserOutlined,
            heading: "Demo2",
            href: "/admin/demo2"
        },
    ]
    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu mode="inline" selectedKeys={[selected]} className="h-full py-3 bg-[#D6E0FF]">
                    {sideBar.map((item, index) => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <Menu.SubMenu key={index} icon={<item.icon />} title={item.heading}>
                                    {item.children.map((child, childIndex) => (
                                        <Menu.Item
                                            key={`${index}-${childIndex}`}
                                            icon={<child.icon />}
                                            onClick={() => {
                                                setSelected(`${index}-${childIndex}`);
                                                navigate(child.href);
                                            }}
                                        >
                                            {expanded && child.heading}
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                            );
                        } else {
                            return (
                                <Menu.Item
                                    key={index}
                                    icon={<item.icon />}
                                    className={selected === index.toString() ? "active" : ""}
                                    onClick={() => {
                                        setSelected(index.toString());
                                        navigate(item.href);
                                    }}
                                    style={item.heading === "Logout" ? { backgroundColor: '#FF1D1D', color: 'white', marginTop: "30px" } : {}}
                                >
                                    {expanded && item.heading}
                                </Menu.Item>
                            );
                        }
                    })}
                </Menu>
            </Sider>
            
        </Layout>
    )
}
export default SideBar;