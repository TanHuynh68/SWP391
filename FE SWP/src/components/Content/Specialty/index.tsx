import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialties } from '@redux/Slice/specialtySlice';
import { RootState, AppDispatch } from '@redux/store/store';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import styles from './Specialty.module.css';
import { Link } from 'react-router-dom';

const Specialty: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const specialties = useSelector((state: RootState) => state.specialty.specialties);
  const [index, setIndex] = useState(0);
  const [props, set] = useSpring(() => ({
    x: 0,
  }));

  useEffect(() => {
    dispatch(fetchSpecialties());
    console.log("specialties: ", specialties)
  }, [dispatch]);

  const SpecialtyCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div className={styles.specialtyCard}>
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{name}</p>
    </div>
  );

  const bind = useDrag(({ direction, distance, cancel }) => {
    const [xDir] = direction; 
    // if (distance > window.innerWidth / 4) cancel();

    if (xDir < 0 && index < specialties.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({ x: -index * (window.innerWidth / 4) });
  });

  return (
    <div className={styles.specialtyContainer}>
      <div className={styles.head}>
        <h2>Phòng Nha uy tín</h2>
        <button className={styles.allPostsButton}>Tìm kiếm</button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div {...bind()} className={styles.specialtyList} style={{ x: props.x }}>
          {specialties.map((specialty, i) => (
            <Link to={`/customer/clinic/${specialty.id}`}>
            <SpecialtyCard key={i} name={specialty.name} imageUrl={specialty.image} />
            </Link>
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Specialty;
