import React from 'react';
import { Carousel, Button } from 'antd';
import styles from './DentalGuide.module.css';
import { useNavigate } from 'react-router-dom';

const DentalGuiDe: React.FC = () => {
  const navigate = useNavigate();

  const handleAllPostsClick = () => {
    navigate('/all');
  };

  return (
    <div>
      <h2>Cẩm nang răng miệng</h2>
      <Carousel autoplay>
        <div className={styles['carousel-slide']}>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
          <div className={styles['carousel-item']}>
            <img src="/path/to/your/image1.png" alt="Cẩm nang 1" />
            <p>Top 7 reputable wisdom tooth extraction addresses in Hanoi</p>
          </div>
        </div>
      </Carousel>
      <Button type="primary" onClick={handleAllPostsClick} style={{ marginTop: '20px' }}>
        Tất cả bài viết
      </Button>
    </div>
  );
};

export default DentalGuiDe;
