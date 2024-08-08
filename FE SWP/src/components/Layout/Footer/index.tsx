import React from 'react';
import styles from './footer.module.css';
import logo from '@assets/home-img/logo.jpg'; 

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.left}>
                    <img src={logo} alt="Dental Health Logo" className={styles.logo} />
                    <div className={styles.companyInfo}>
                        <h4 className={styles.companyName}>Công ty Cổ phần Công nghệ BookingCare FPTeeth</h4>
                        <p className={styles.address}> Lô E2a-7, Đường D1 Khu Công nghệ cao, P.Long Thạnh Mỹ, TP Thủ Đức, TP.HCM, Việt Nam</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <h4 className={styles.heading}>Trụ sở tại Hà Nội</h4>
                    <p className={styles.address}>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                    <h4 className={styles.heading}>Hỗ trợ khách hàng</h4>
                    <p className={styles.support}>support@bookingcare.vn</p>
                </div>
                <div className={styles.bottomRight}>
                    <img src="path-to-image/robot.png" alt="Support Robot" className={styles.robotImage} />  {/* co time thi lam sau */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
