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
                <li className={styles.sidebarItem}><a href="#home">Home</a></li>
                <li className={styles.sidebarItem}><a href="#dental-handbook">Dental handbook</a></li>
                <li className={styles.sidebarItem}><a href="#contact-cooperation">Contact for Cooperation</a></li>
                <li className={styles.sidebarItem}><a href="#for-dentists">For Dentists</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;


