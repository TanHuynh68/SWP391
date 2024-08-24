import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '@redux/Slice/doctorSlice';
import { RootState, AppDispatch } from '@redux/Store/store';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useNavigate } from 'react-router-dom'; 
import styles from './Doctor.module.css';

const Doctor: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const doctors = useSelector((state: RootState) => state.doctor.doctors);
  const [index, setIndex] = useState(0); 
  const [props, set] = useSpring(() => ({
    x: 0,
  }));
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const DoctorCard: React.FC<{ name: string; imageUrl: string }> = ({ name, imageUrl }) => (
    <div 
      className={styles.doctorCard} 
      onClick={() => navigate('/dental-details')} 
    >
      <img src={imageUrl} alt={name} className={styles.icon} />
      <p>{`Bác sĩ ${name}`}</p>
    </div>
  );

  const bind = useDrag(({ direction: [xDir], distance, cancel }) => {
    if (distance > window.innerWidth / 4) cancel(); 

    if (xDir < 0 && index < doctors.length - 4) {
      setIndex(index + 1);
    } else if (xDir > 0 && index > 0) {
      setIndex(index - 1);
    }

    set({
      x: -index * (window.innerWidth / 4),
    });
  });

  return (
    <div className={styles.doctorContainer}>
      <div className={styles.head}>
        <h2>Nha sĩ nổi bật</h2>
        <button className={styles.allPostsButton}>
          {/* onClick={() => navigate('/doctors')} */}
          Tìm kiếm
        </button>
      </div>
      <div className={styles.carouselContainer}>
        <animated.div {...bind()} className={styles.doctorList} style={{ x: props.x }}>
          {doctors.map((doctor, i) => (
            <DoctorCard 
              key={i} 
              name={doctor.account.fullName} 
              imageUrl={doctor.image} 
            />
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Doctor;
