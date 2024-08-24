import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '@assets/home-img/logo.jpg';
import Sidebar from '../Sidebar/index';
import { ProfilePopUp } from '../PopUpProfile';


const Header: React.FC = () => {
    const [sidebarVisible, setSidebarVisible] = React.useState(false);
    const navigate = useNavigate();
    const tokenFromLocalstorage = localStorage.getItem("token");
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
        <div>
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
                                <a href="#home" className={styles.navLink}>Trang Chủ</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#services" className={styles.navLink}>Dịch Vụ</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#about" className={styles.navLink}>Giới Thiệu</a>
                            </li>
                            <li className={styles.navItem}>
                                <a href="#contact" className={styles.navLink}>Liên Hệ</a>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.actions}>
                        {!tokenFromLocalstorage && (
                            <>
                                <button className={styles.loginButton} onClick={handleLoginClick}>Đăng Nhập</button>
                                <button className={styles.signupButton} onClick={handleSignUpClick}>Đăng Ký</button>
                            </>
                        )}
                    </div>
                    {tokenFromLocalstorage && (
                        <div className={styles.header_profile}>
                            <ProfilePopUp />
                        </div>
                    )}
                </div>
            </header>

            <Sidebar isVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
        </div>
    );
};

export default Header;
