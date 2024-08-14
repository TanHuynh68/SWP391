import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom';
import styles from './Doctor.module.css';
import { doctorData } from '@data/doctorData';

const Doctor: React.FC = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [props, set] = useSpring(() => ({
    x: 0,
  }));

  const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
    if (distance > window.innerWidth / 4) cancel();

    if (xDir < 0 && index < doctorData.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({
      x: -index * (window.innerWidth / 4),
    });
  });

  const handleAllPostsClick = () => {
    navigate('/doctors');
  };

  const DoctorCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className={styles.doctorCard}>
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{`Bác sĩ ${name}`}</p>
    </div>
  );

  return (
    <div className={styles.doctorContainer}>
      <div className={styles.head}>
        <h2>Nha sĩ nổi bật</h2>
        <button onClick={handleAllPostsClick} className={styles.allPostsButton}>
          Tìm kiếm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div {...bind()} className={styles.doctorList} style={{ x: props.x }}>
          {doctorData.map((doctor, i) => (
            <DoctorCard key={i} name={doctor.name} imageUrl={doctor.imageUrl} />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Doctor;
