import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SpecialtyPage.module.css';
import { specialPackagesData } from '@data/services';

const SpecialtyPage: React.FC = () => {
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
        <h2>Khám chuyên khoa</h2>
      </div>
      <div className={styles.list}>
        {specialPackagesData.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageContainer}>
              <img src={item.imageUrl} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.titleContainer}>
              <a href={item.link} className={styles.title}>
                {item.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyPage;
