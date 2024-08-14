import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';
import styles from './DentalGuide.module.css';
import { dentalGuideData } from '@data/dentalGuideData';

const DentalGuide: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [props, set] = useSpring(() => ({
    x: 0,
  }));

  const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
    if (distance > window.innerWidth / 4) cancel();

    if (xDir < 0 && index < dentalGuideData.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({
      x: -index * (window.innerWidth / 4),
    });
  });

  const handleAllPostsClick = () => {
    navigate('/dental-handbook');
  };

  const GuideCard: React.FC<{ title: string; imageUrl: string; link: string }> = ({ title, imageUrl, link }) => (
    <div className={styles.serviceCard}>
      <img src={imageUrl} alt={title} className={styles.icon} />
      <p>
        <a href={link}>{title}</a>
      </p>
    </div>
  );

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.head}>
        <h2>Cẩm nang răng miệng</h2>
        <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
          Tất cả bài viết
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div {...bind()} className={styles.servicesList} style={{ x: props.x }}>
          {dentalGuideData.map((item, index) => (
            <GuideCard key={index} title={item.title} imageUrl={item.imageUrl} link={item.link} />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default DentalGuide;
