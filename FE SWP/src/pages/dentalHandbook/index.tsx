import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DentalHandbook.module.css';
import { dentalGuideData } from '@data/dentalGuideData';

const DentalHandbook: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBackToHome} className={styles.homeButton}>
          Quay về trang chủ
        </button>
        <h2>Cẩm nang răng miệng</h2>
      </div>
      <div className={styles.list}>
        {dentalGuideData.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <img src={item.imageUrl} alt={item.title} className={styles.image} />
            </div>
            <div className={styles.titleContainer}>
              <a href={item.link} className={styles.title}>
                {item.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <a href="#" className={styles.loadMore}>Xem thêm</a>
      </div>
    </div>
  );
};

export default DentalHandbook;
