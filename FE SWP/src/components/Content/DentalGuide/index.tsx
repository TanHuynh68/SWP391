// import { Carousel, Button } from 'antd';

import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './DentalGuide.module.css';
import { dentalGuideData } from '@data/dentalGuideData';

const DentalGuide: React.FC = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<any>(null);

  const handleAllPostsClick = () => {
    navigate('/dental-handbook');
  };

  const handleCarouselClick = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.head}>
          <h2>Cẩm nang răng miệng</h2>
          <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
            Tất cả bài viết
          </button>
        </div>

        <Carousel
          dots={false}
          slidesToShow={2}
          slidesToScroll={1}
          className={styles.carousel}
          ref={carouselRef}
        >
          {dentalGuideData.map((item, index) => (
            <div
              key={index}
              className={styles.data}
              onClick={handleCarouselClick}
            >
              <div className={styles.ba}>
                <div className={styles.img}>
                  <img src={item.imageUrl} alt={item.title} />
                </div>
                <div className={styles.title}>
                  <a href={item.link}>{item.title}</a>
                </div>
              </div>

            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DentalGuide;

