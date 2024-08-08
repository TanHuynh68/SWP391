import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../../assets/home-img/logo.jpg';

const Header: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignUpClick = () => {
        navigate('/sign-up');
    };

    return (
        <div >
            <header className={styles.header}>
                <div className={styles.container}>
                    <button className={styles.sidebarToggle} onClick={toggleSidebar}>
                        ☰
                    </button>
                    <div className={styles.logo}>
                        <a href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                    <nav className={styles.nav}>
                        <ul className={styles.navList}>
                            <li className={styles.navItem}>
                                <a href="#home" className={styles.navLink}>Home</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#services" className={styles.navLink}>Services</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#about" className={styles.navLink}>About</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#contact" className={styles.navLink}>Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.actions}>
                        <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
                        <button className={styles.signupButton} onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
