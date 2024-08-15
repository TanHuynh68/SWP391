import React from 'react';
import styles from './Sidebar.module.css';
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
    isVisible: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, toggleSidebar }) => {
    return (
        <div className={`${styles.sidebar} ${isVisible ? styles.visible : ''}`}>
            <button className={styles.closeButton} onClick={toggleSidebar}>×</button>
            <nav className={styles.nav}>
                <Link to="/" className={styles.item} onClick={toggleSidebar}>
                    Trang Chủ
                </Link>
                <Link to="/dental-handbook" className={styles.item} onClick={toggleSidebar}>
                    Cẩm Nang Răng Miệng
                </Link>
                <Link to="/contact-cooperation" className={styles.item} onClick={toggleSidebar}>
                    Liên Hệ Hợp Tác
                </Link>
                <Link to="/for-dentists" className={styles.item} onClick={toggleSidebar}>
                    Cho Nha Sĩ
                </Link>
            </nav>
            <div className={styles.social}>
                <a href="https://facebook.com" className={styles.socialIcon}>
                    <img src="path-to-facebook-icon" alt="Facebook" />
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
