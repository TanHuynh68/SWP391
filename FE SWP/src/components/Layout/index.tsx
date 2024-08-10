import React, { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./index.module.css";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // State to manage sidebar visibility
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <Sidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
            <div className={sidebarVisible ? styles.content : styles.contentSidebarDisabled}>
                <div className={styles.children}>
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
