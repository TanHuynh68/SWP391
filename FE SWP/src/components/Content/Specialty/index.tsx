import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';
import styles from './Specialty.module.css';
import { specialtyData } from '@data/specialtyData'; 

const Specialty: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [props, set] = useSpring(() => ({
    x: 0,
  }));

  const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
    if (distance > window.innerWidth / 4) cancel();

    if (xDir < 0 && index < specialtyData.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({
      x: -index * (window.innerWidth / 4),
    });
  });

  // const handleAllPostsClick = () => {
  //   navigate('/specialty');
  // };

  const SpecialtyCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className={styles.specialtyCard}>
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{name}</p>
    </div>
  );

  return (
    <div className={styles.specialtyContainer}>
      <div className={styles.head}>
        <h2>Phòng Nha uy tín</h2>
        {/* <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
          Tìm kiếm
        </button> */}
        <button className={styles.allPostsButton}>
          Tìm kiếm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div {...bind()} className={styles.specialtyList} style={{ x: props.x }}>
          {specialtyData.map((specialty, i) => (
            <SpecialtyCard key={i} name={specialty.name} imageUrl={specialty.imageUrl} />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Specialty;
