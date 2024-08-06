import React from 'react';
import styles from './Header.module.css';
import logo from '@assets/home-img/logo.jpg';
const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
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
                    <button className={styles.loginButton}>Login</button>
                    <button className={styles.signupButton}>Sign Up</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
