import React from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
    isVisible: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleSidebar }) => {
    return (
        <div className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}>
            <button className={styles.closeButton} onClick={toggleSidebar}>×</button>
            <ul className={styles.sidebarList}>
                <li className={styles.sidebarItem}><a href="#home">Trang Chủ</a></li>
                <li className={styles.sidebarItem}><a href="#dental-handbook">Cẩm Nang Răng Miêng</a></li>
                <li className={styles.sidebarItem}><a href="#contact-cooperation">Liên Hệ Hợp Tác</a></li>
                <li className={styles.sidebarItem}><a href="#for-dentists">Cho Nha Sĩ</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;


