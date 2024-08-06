import React, { useState } from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
interface SidebarDataType {
  icon: React.ElementType;
  heading: string;
  href: string;
  children?: SidebarDataType[];
}
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



const App: React.FC = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>('');
  const [expanded] = useState<boolean>(true);
  const sideBar: SidebarDataType[] = [

    {
      icon: VideoCameraOutlined,
      heading: "Demo",
      href: "/admin/demo"
    },
    {
      icon: UserOutlined,
      heading: "Demo",
      href: "/admin/demo"
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
      <Layout style={{ marginInlineStart: 200 }}>
        <Header />
        <Content >
        
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;